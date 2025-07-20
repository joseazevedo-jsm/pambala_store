import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../styles/colors";
import { typography } from "../../styles/typography";
import { spacing } from "../../styles/spacing";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import MaterialCommunityIcons

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
  originalPrice?: number;
  onPress: () => void;
  isSaved?: boolean; // New prop for saved state
  onToggleSave?: () => void; // New prop for toggling save
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  originalPrice,
  onPress,
  isSaved = false, // Default to not saved
  onToggleSave,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.heartIconContainer} onPress={onToggleSave}>
          <MaterialCommunityIcons
            name={isSaved ? "heart" : "heart-outline"}
            size={24}
            color={isSaved ? colors.brandPurpleVibrant : colors.surfaceWhite} // Color based on saved state
          />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={typography.productTitle}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={[typography.body, styles.priceText]}>${price.toFixed(2)}</Text>
          {originalPrice && (
            <Text style={[typography.body, styles.originalPriceText]}>
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
    borderRadius: 16, // Updated from 12 to 16
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Subtle shadow
    shadowOpacity: 0.1, // Subtle shadow
    shadowRadius: 4, // Subtle shadow
    // Removed padding from here, moved to infoContainer
  },
  imageContainer: {
    aspectRatio: 1,
    width: "100%",
    borderTopLeftRadius: 16, // Match card's border radius
    borderTopRightRadius: 16, // Match card's border radius
    overflow: 'hidden', // Clip image to border radius
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heartIconContainer: {
    position: 'absolute',
    top: spacing.spacingSm, // 8px from top
    right: spacing.spacingSm, // 8px from right
    backgroundColor: 'rgba(255,255,255,0.7)', // Subtle circular background
    borderRadius: 20, // Make it circular
    padding: spacing.xs, // Small padding for touch area
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: spacing.spacingMd, // Added padding here
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  priceText: {
    color: colors.textPrimary, // Using textPrimary for price
    fontWeight: 'bold', // Explicitly bold for price
  },
  originalPriceText: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
    marginLeft: spacing.spacingSm,
  },
});

export default ProductCard;
