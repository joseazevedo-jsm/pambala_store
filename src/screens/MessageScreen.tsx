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
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading1,
    color: colors.neutralDark,
    marginBottom: spacing.md,
  },
  text: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralMedium,
    textAlign: "center",
  },
});

export default MessageScreen;
