import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {

  // AI Chat API
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    try {
      const reply = `AskGram AI: Aapne kaha "${message}". Main jald hi Gemini AI ke saath connect ho jaunga!`;

      res.json({ reply });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "AI Chat error" });
    }
  });

  // Register User
  app.post("/api/register", async (req, res) => {

    const result = insertUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    try {
      const existingUser = await storage.getUserByUsername(result.data.username);

      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(result.data);

      res.status(201).json(user);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "User creation failed" });
    }

  });

  const httpServer = createServer(app);

  return httpServer;
}
