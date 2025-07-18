import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  leftIcon,
  disabled = false,
}) => {
  const getBackgroundColor = () => {
    if (disabled) {
      return colors.neutralLight;
    }
    return variant === "primary" ? colors.brandPrimary : colors.actionAccent;
  };

  const getTextColor = () => {
    if (disabled) {
      return colors.neutralMedium;
    }
    return colors.surfaceWhite;
  };

  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={textColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.button,
  },
  icon: {
    marginRight: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default Button;
