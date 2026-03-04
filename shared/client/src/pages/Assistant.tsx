import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/colors";

export default function AssistantScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);
    
    // AI Response logic yahan aayega
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "ai", text: "Hello! Main AskGram AI hoon. Main aapki kaise madad kar sakta hoon?" }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>AskGram AI</Text></View>
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.scrollContent}>
        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.role === "user" ? styles.user : styles.ai]}>
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
        {isLoading && <ActivityIndicator color="#0095f6" />}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput style={styles.input} value={input} onChangeText={setInput} placeholder="Ask anything..." placeholderTextColor="#999" />
        <Pressable onPress={sendMessage} style={styles.btn}><Feather name="send" size={20} color="white" /></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: { paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: "#333" },
  title: { fontSize: 22, fontWeight: "800", color: "#fff" },
  chatContainer: { flex: 1 },
  scrollContent: { padding: 20, gap: 12 },
  bubble: { padding: 12, borderRadius: 16, maxWidth: "80%", marginBottom: 8 },
  user: { alignSelf: "flex-end", backgroundColor: "#0095f6" },
  ai: { alignSelf: "flex-start", backgroundColor: "#262626" },
  text: { color: "#fff", fontSize: 15 },
  inputArea: { flexDirection: "row", padding: 16, gap: 10, borderTopWidth: 0.5, borderTopColor: "#333" },
  input: { flex: 1, backgroundColor: "#262626", borderRadius: 20, paddingHorizontal: 15, color: "#fff", height: 40 },
  btn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#0095f6", alignItems: "center", justifyContent: "center" }
});
