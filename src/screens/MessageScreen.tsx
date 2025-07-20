import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";

const MessageScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensagens</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>User messages and chat will go here.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
    marginBottom: spacing.spacingMd,
  },
  headerTitle: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.spacingMd,
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

export default MessageScreen;
