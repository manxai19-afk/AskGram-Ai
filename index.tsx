import React from "react";
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/colors";

// Temporary Data for Feed
const POSTS = [
  { id: "1", user: "manan_dev", content: "Building AskGram with Gemini AI! 🔥", likes: 120 },
  { id: "2", user: "askgram_official", content: "Welcome to the future of social media.", likes: 850 },
];

export default function HomeScreen() {
  const renderItem = ({ item }: { item: typeof POSTS[0] }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.username}>{item.user}</Text>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.postFooter}>
        <Pressable style={styles.actionButton}>
          <Feather name="heart" size={20} color={Colors.dark.like} />
          <Text style={styles.actionText}>{item.likes}</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Feather name="message-circle" size={20} color={Colors.dark.textSecondary} />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Feather name="send" size={20} color={Colors.dark.textSecondary} />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>AskGram</Text>
        <Feather name="plus-square" size={24} color={Colors.dark.text} />
      </View>

      <FlatList
        data={POSTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.dark.divider,
  },
  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.dark.text,
    letterSpacing: -0.5,
  },
  feed: {
    paddingVertical: 8,
  },
  postCard: {
    backgroundColor: Colors.dark.surface,
    marginBottom: 8,
    paddingVertical: 12,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.cardBorder,
    marginRight: 10,
  },
  username: {
    color: Colors.dark.text,
    fontWeight: "700",
    fontSize: 14,
  },
  postContent: {
    color: Colors.dark.text,
    fontSize: 15,
    paddingHorizontal: 12,
    lineHeight: 20,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    color: Colors.dark.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
});
