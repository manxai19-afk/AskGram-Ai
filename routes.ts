import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // 1. AI Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    try {
      // Yahan hum Gemini AI ka logic add karenge baad mein
      // Abhi ke liye ek simple response bhej rahe hain
      const reply = `AskGram AI: Aapne kaha "${message}". Main jald hi Gemini AI ke saath connect ho jaunga!`;
      res.json({ reply });
    } catch (error) {
      res.status(500).json({ message: "AI Chat error" });
    }
  });

  // 2. User Registration Endpoint
  app.post("/api/register", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const existingUser = await storage.getUserByUsername(result.data.username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await storage.createUser(result.data);
    res.status(201).json(user);
  });

  const httpServer = createServer(app);
  return httpServer;
}
