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
import Button from "../components/common/Button";

type SavedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const SavedScreen = () => {
  const wishlistProductIds = useSelector((state: RootState) => state.wishlist.productIds);
  const dispatch = useDispatch();
  const navigation = useNavigation<SavedScreenNavigationProp>();

  const wishlistProducts = MOCK_PRODUCTS.filter(product =>
    wishlistProductIds.includes(product.id)
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Itens Salvos</Text>
    </View>
  );

  if (wishlistProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="heart" size={80} color={colors.borderNeutral} />
        <Text style={styles.emptyText}>Sua lista está vazia</Text>
        <Text style={styles.emptySubText}>Adicione produtos à sua lista de desejos para vê-los aqui.</Text>
        <Button
          title="Explorar Produtos"
          onPress={() => navigation.navigate("HomeTab")} // Assuming "HomeTab" is the route name for your home screen
          variant="primary"
          style={styles.exploreButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ProductCard
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            originalPrice={item.originalPrice}
            onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
            isSaved={true} // Explicitly set to true for saved items
            onToggleSave={() => dispatch(removeFromWishlist(item.id))}
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
    backgroundColor: colors.backgroundLight, // Updated background color
  },
  header: {
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
    marginBottom: spacing.spacingMd,
  },
  headerTitle: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.spacingMd,
    backgroundColor: colors.backgroundLight, // Ensure empty state also uses backgroundLight
  },
  emptyText: {
    ...typography.heading2, // Updated typography
    color: colors.textPrimary, // Updated color
    marginTop: spacing.spacingMd,
  },
  emptySubText: {
    ...typography.body, // Updated typography
    color: colors.textSecondary, // Updated color
    marginTop: spacing.spacingSm,
    textAlign: "center",
    marginBottom: spacing.spacingLg, // Added margin bottom for button
  },
  exploreButton: {
    width: '80%', // Make button wider
  },
  productList: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingMd,
  },
  productGrid: {
    justifyContent: "space-between",
    marginBottom: spacing.spacingMd,
  },
});

export default SavedScreen;
