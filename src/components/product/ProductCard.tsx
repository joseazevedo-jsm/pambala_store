import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { spacing } from "../../styles/spacing";

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
  originalPrice?: number;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  originalPrice,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>
              ${originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
  },
  infoContainer: {
    marginTop: spacing.sm,
  },
  name: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.productTitle,
    color: colors.neutralDark,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  price: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.bodyLarge,
    color: colors.brandPrimary,
  },
  originalPrice: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralMedium,
    textDecorationLine: "line-through",
    marginLeft: spacing.sm,
  },
});

export default ProductCard;
