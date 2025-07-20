import React from "react";
import { Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  style?: ViewStyle | TextStyle;
  priceStyle?: TextStyle;
  originalPriceStyle?: TextStyle;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  style,
  priceStyle,
  originalPriceStyle,
}) => {
  return (
    <Text style={style}>
      <Text style={[styles.price, priceStyle]}>${price.toFixed(2)}</Text>
      {originalPrice && (
        <Text style={[styles.originalPrice, originalPriceStyle]}>
          ${originalPrice.toFixed(2)}
        </Text>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  price: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.body.fontSize,
    color: colors.brandPurpleVibrant,
  },
  originalPrice: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    textDecorationLine: "line-through",
    marginLeft: 8, // Adjust as needed
  },
});

export default PriceDisplay;
