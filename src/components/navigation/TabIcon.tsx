import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

interface TabIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size, focused }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={focused ? styles.focusedIcon : styles.unfocusedIcon}
    />
  );
};

const styles = StyleSheet.create({
  focusedIcon: {
    // Add any specific styles for focused state, e.g., a subtle shadow or larger size
  },
  unfocusedIcon: {
    // Add any specific styles for unfocused state
  },
});

export default TabIcon;
