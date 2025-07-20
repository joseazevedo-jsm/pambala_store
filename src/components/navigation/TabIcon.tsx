import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";

interface TabIconProps {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  size: number;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ name, size, focused }) => {
  const iconColor = focused ? colors.brandPurpleVibrant : colors.textSecondary;
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={iconColor}
    />
  );
};

export default TabIcon;
