import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromWishlist } from "../store/wishlistSlice";
import { MOCK_PRODUCTS } from "../utils/mockData";
import ProductCard from "../components/product/ProductCard";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type SavedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const SavedScreen = () => {
  const wishlistProductIds = useSelector((state: RootState) => state.wishlist.productIds);
  const dispatch = useDispatch();
  const navigation = useNavigation<SavedScreenNavigationProp>();

  const wishlistProducts = MOCK_PRODUCTS.filter(product =>
    wishlistProductIds.includes(product.id)
  );

  if (wishlistProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="heart-off" size={80} color={colors.neutralLight} />
        <Text style={styles.emptyText}>Your wishlist is empty!</Text>
        <Text style={styles.emptySubText}>Save products to view them here later.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.productGrid}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
    paddingTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md,
  },
  emptyText: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading2,
    color: colors.neutralMedium,
    marginTop: spacing.md,
  },
  emptySubText: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralLight,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  productList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  productGrid: {
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
});

export default SavedScreen;
