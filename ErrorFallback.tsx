import React, { useState } from "react";
import { reloadAppAsync } from "expo";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Text,
  Modal,
  useColorScheme,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

export type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
};

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const theme = {
    background: isDark ? "#000000" : "#FFFFFF",
    backgroundSecondary: isDark ? "#1C1C1E" : "#F2F2F7",
    text: isDark ? "#FFFFFF" : "#000000",
    textSecondary: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
    link: "#007AFF",
    buttonText: "#FFFFFF",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRestart = async () => {
    try {
      await reloadAppAsync();
    } catch (restartError) {
      console.error("Failed to restart app:", restartError);
      resetError();
    }
  };

  const formatErrorDetails = (): string => {
    let details = `Error: ${error.message}\n\n`;
    if (error.stack) {
      details += `Stack Trace:\n${error.stack}`;
    }
    return details;
  };

  const monoFont = Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {__DEV__ ? (
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={({ pressed }) => [
            styles.topButton,
            {
              top: insets.top + 16,
              backgroundColor: theme.backgroundSecondary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="alert-circle" size={20} color={theme.text} />
        </Pressable>
      ) : null}

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Something went wrong
        </Text>
        <Text style={[styles.message, { color: theme.textSecondary }]}>
          Please reload the app to continue.
        </Text>
        <Pressable
          onPress={handleRestart}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.link, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>
            Try Again
          </Text>
        </Pressable>
      </View>

      {__DEV__ && (
        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor: theme.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Error Details</Text>
                <Pressable onPress={() => setIsModalVisible(false)}>
                  <Feather name="x" size={24} color={theme.text} />
                </Pressable>
              </View>
              <ScrollView style={styles.modalScrollView}>
                <View style={[styles.errorContainer, { backgroundColor: theme.backgroundSecondary }]}>
                  <Text style={[styles.errorText, { color: theme.text, fontFamily: monoFont }]} selectable>
                    {formatErrorDetails()}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  content: { alignItems: "center", gap: 16, width: "100%" },
  title: { fontSize: 28, fontWeight: "700", textAlign: "center" },
  message: { fontSize: 16, textAlign: "center" },
  topButton: { position: "absolute", right: 16, width: 44, height: 44, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  button: { paddingVertical: 16, borderRadius: 8, paddingHorizontal: 24, minWidth: 200 },
  buttonText: { fontWeight: "600", textAlign: "center", fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "flex-end" },
  modalContainer: { width: "100%", height: "90%", borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1 },
  modalTitle: { fontSize: 20, fontWeight: "600" },
  modalScrollView: { flex: 1 },
  errorContainer: { margin: 16, borderRadius: 8, padding: 16 },
  errorText: { fontSize: 12 },
});
