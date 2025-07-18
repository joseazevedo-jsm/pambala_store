import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { spacing } from "../../styles/spacing";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface InfoRowProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ iconName, text }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={colors.neutralDark}
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
  },
});

export default InfoRow;
