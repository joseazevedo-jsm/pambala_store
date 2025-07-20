import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline"; // Added 'outline' variant
  leftIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle; // Added style prop for external styling
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  leftIcon,
  disabled = false,
  style,
}) => {
  const getButtonStyles = () => {
    let backgroundColor: string;
    let textColor: string;
    let borderColor: string | undefined;
    let borderWidth: number | undefined;

    if (disabled) {
      backgroundColor = colors.borderNeutral; // Using borderNeutral for disabled background
      textColor = colors.textSecondary; // Using textSecondary for disabled text
    } else {
      switch (variant) {
        case "primary":
          backgroundColor = colors.brandPurpleVibrant;
          textColor = colors.surfaceWhite;
          break;
        case "secondary":
          backgroundColor = colors.brandPurpleDark;
          textColor = colors.surfaceWhite;
          break;
        case "outline":
          backgroundColor = "transparent";
          textColor = colors.brandPurpleVibrant;
          borderColor = colors.brandPurpleVibrant;
          borderWidth = 1;
          break;
        default:
          backgroundColor = colors.brandPurpleVibrant;
          textColor = colors.surfaceWhite;
      }
    }

    return {
      backgroundColor,
      color: textColor,
      borderColor,
      borderWidth,
    };
  };

  const { backgroundColor, color: textColor, borderColor, borderWidth } = getButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, borderColor, borderWidth },
        disabled && styles.disabled, // Use a more generic disabled style
        style, // Apply external style prop
      ]}
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
      <Text style={[typography.button, { color: textColor }]}>{title}</Text>
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
  icon: {
    marginRight: 8,
  },
  disabled: {
    opacity: 0.6, // Reduced opacity for disabled state
  },
});

export default Button;
