import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from "react-native";
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
  const wishlistItems = useSelector((state: RootState) => state.wishlist.productIds);

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
        <TouchableOpacity onPress={handleToggleWishlist} style={styles.headerIcon}>
          <MaterialCommunityIcons
            name={isInWishlist ? "heart" : "heart-outline"}
            size={24}
            color={isInWishlist ? colors.brandPurpleVibrant : colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.carouselContainer}>
          <Carousel data={carouselData} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>

          <View style={styles.infoSection}>
            <InfoRow iconName="truck-delivery" text={`Shipping: ${product.shippingOptions.join(", ")}`} />
            <InfoRow iconName="credit-card-outline" text={`Payment: ${product.paymentOptions.join(", ")}`} />
            <InfoRow iconName="store-outline" text={`Seller: ${product.sellerInfo.name} (${product.sellerInfo.rating} / 5)`} />
            <InfoRow iconName="tag-text-outline" text={`Condition: ${product.condition}`} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomActionBar}>
        <Animated.View style={[animatedButtonStyle, styles.addToCartButtonWrapper]}>
          <Button
            title={isInCart ? "Added to Cart" : "Add to Cart"}
            onPress={handleAddToCart}
            variant="outline"
            disabled={isInCart}
            style={styles.actionButton}
          />
        </Animated.View>
        <Button
          title="Buy Now"
          onPress={() => { /* Navigate to checkout */ }}
          variant="primary"
          style={styles.actionButton}
        />
      </View>
      {showAddedToCartMessage && (
        <Text style={styles.addedToCartMessage}>Item added to cart!</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    ...typography.heading1,
    color: colors.feedbackError,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
  },
  headerIcon: {
    padding: spacing.xs, // Increase touch target
  },
  headerTitle: {
    ...typography.heading2,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.spacingMd,
  },
  scrollViewContent: {
    paddingBottom: spacing.spacingXl * 2, // Add extra padding for the fixed action bar
  },
  carouselContainer: {
    aspectRatio: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    marginBottom: spacing.spacingMd,
  },
  contentContainer: {
    padding: spacing.spacingLg,
    backgroundColor: colors.surfaceWhite,
    // Removed borderTopLeftRadius and borderTopRightRadius as they are now on carouselContainer
    // Removed marginTop as it's not needed with the new header and carousel structure
  },
  productName: {
    ...typography.heading1,
    color: colors.textPrimary,
    marginBottom: spacing.spacingSm,
  },
  productPrice: {
    ...typography.display,
    color: colors.brandPurpleVibrant,
    marginTop: spacing.spacingSm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderNeutral,
    marginVertical: spacing.spacingLg,
  },
  descriptionTitle: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.spacingSm,
  },
  descriptionText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.spacingLg,
  },
  infoSection: {
    marginBottom: spacing.spacingLg,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceWhite,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingMd,
    borderTopWidth: 1,
    borderTopColor: colors.borderNeutral,
    // Shadow for iOS
    ...(Platform.OS === 'ios' && {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    }),
    // Elevation for Android
    elevation: 10,
  },
  addToCartButtonWrapper: {
    flex: 1,
    marginRight: spacing.spacingMd,
  },
  actionButton: {
    flex: 1,
  },
  addedToCartMessage: {
    ...typography.body,
    color: colors.feedbackSuccess,
    textAlign: "center",
    marginTop: spacing.spacingSm,
    position: 'absolute',
    bottom: spacing.spacingXl + spacing.spacingMd, // Position above the action bar
    left: 0,
    right: 0,
  },
});

export default ProductDetailScreen;
