import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <Text style={styles.text}>User messages and chat will go here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    padding: spacing.spacingMd,
  },
  title: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.heading1.fontSize,
    color: colors.textPrimary,
    marginBottom: spacing.spacingMd,
  },
  text: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textAlign: "center",
  },
});

export default MessageScreen;
