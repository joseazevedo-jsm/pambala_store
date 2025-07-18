import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { MOCK_PRODUCTS } from "../utils/mockData";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import Button from "../components/common/Button";
import InfoRow from "../components/common/InfoRow";
import Carousel from "../components/common/Carousel";
import PriceDisplay from "../components/common/PriceDisplay";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { RootState } from "../store/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen = () => {
  const route = useRoute<ProductDetailScreenRouteProp>();
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const dispatch = useDispatch();
  const { productId } = route.params;

  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const buttonScale = useSharedValue(1);

  const product = MOCK_PRODUCTS.find((p) => p.id === productId);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInCart = cartItems.some(item => item.id === productId);
  const isInWishlist = wishlistItems.includes(productId);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found!</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowAddedToCartMessage(true);
    buttonScale.value = withTiming(1.05, { duration: 100, easing: Easing.ease }, () => {
      buttonScale.value = withTiming(1, { duration: 100, easing: Easing.ease });
    });
    setTimeout(() => {
      setShowAddedToCartMessage(false);
    }, 1500);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const carouselData = product.images.map((img, index) => ({
    id: `image-${index}`,
    imageUrl: img,
  }));

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel data={carouselData} />

        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <TouchableOpacity onPress={handleToggleWishlist}>
              <MaterialCommunityIcons
                name={isInWishlist ? "heart" : "heart-outline"}
                size={28}
                color={isInWishlist ? colors.feedbackError : colors.neutralMedium}
              />
            </TouchableOpacity>
          </View>

          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            style={styles.priceDisplay}
            priceStyle={styles.currentPrice}
            originalPriceStyle={styles.originalPrice}
          />

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.infoSection}>
            <InfoRow iconName="truck-delivery" text={`Shipping: ${product.shippingOptions.join(", ")}`} />
            <InfoRow iconName="credit-card-outline" text={`Payment: ${product.paymentOptions.join(", ")}`} />
            <InfoRow iconName="store-outline" text={`Seller: ${product.sellerInfo.name} (${product.sellerInfo.rating} / 5)`} />
            <InfoRow iconName="tag-text-outline" text={`Condition: ${product.condition}`} />
          </View>

          <Animated.View style={animatedButtonStyle}>
            <Button
              title={isInCart ? "Added to Cart" : "Add to Cart"}
              onPress={handleAddToCart}
              variant="primary"
              disabled={isInCart}
            />
          </Animated.View>
          {showAddedToCartMessage && (
            <Text style={styles.addedToCartMessage}>Item added to cart!</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: typography.sizes.heading1,
    fontFamily: typography.fontFamily.interBold,
    color: colors.feedbackError,
  },
  contentContainer: {
    padding: spacing.md,
    backgroundColor: colors.surfaceWhite,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -spacing.lg, // Overlap with carousel slightly
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  productName: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.productTitle,
    color: colors.neutralDark,
    flex: 1,
    marginRight: spacing.md,
  },
  priceDisplay: {
    marginBottom: spacing.md,
  },
  currentPrice: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading2,
    color: colors.brandPrimary,
  },
  originalPrice: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralMedium,
    textDecorationLine: "line-through",
    marginLeft: spacing.sm,
  },
  description: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralMedium,
    marginBottom: spacing.lg,
  },
  infoSection: {
    marginBottom: spacing.lg,
  },
  addedToCartMessage: {
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.feedbackSuccess,
    textAlign: "center",
    marginTop: spacing.sm,
  },
});

export default ProductDetailScreen;
