import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import Button from "../components/common/Button";
import PriceDisplay from "../components/common/PriceDisplay";

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Checkout'>;

const CartScreen = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Meu Carrinho ({cartItems.length} itens)</Text>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="cart-off" size={80} color={colors.borderNeutral} />
        <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
        <Text style={styles.emptySubText}>Comece a adicionar produtos incríveis.</Text>
        <Button
          title="Explorar Produtos"
          onPress={() => navigation.navigate("HomeTab")}
          variant="secondary"
          style={styles.exploreButton}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <PriceDisplay price={item.price} style={styles.itemPrice} />
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)} style={styles.iconButton} accessibilityLabel={`Decrease quantity of ${item.name}`}>
                  <MaterialCommunityIcons name="minus-circle-outline" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)} style={styles.iconButton} accessibilityLabel={`Increase quantity of ${item.name}`}>
                  <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={[styles.removeButton, styles.iconButton]} accessibilityLabel={`Remove ${item.name} from cart`}>
                  <MaterialCommunityIcons name="delete-outline" size={24} color={colors.feedbackError} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal:</Text>
          <Text style={styles.summaryAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Frete:</Text>
          <Text style={styles.summaryAmount}>$0.00</Text> {/* Placeholder for shipping */}
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <Button title="Finalizar Compra" onPress={() => navigation.navigate("Checkout")} style={styles.checkoutButton} />
      </View>
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
    backgroundColor: colors.backgroundLight,
  },
  emptyText: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginTop: spacing.spacingMd,
  },
  emptySubText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.spacingSm,
    textAlign: "center",
    marginBottom: spacing.spacingLg,
  },
  exploreButton: {
    width: '80%',
  },
  listContent: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingLg,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.spacingSm,
    marginBottom: spacing.spacingMd,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.spacingMd,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    ...typography.productTitle,
    color: colors.textPrimary,
  },
  itemPrice: {
    marginTop: spacing.xs,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.spacingSm,
  },
  itemQuantity: {
    ...typography.body,
    color: colors.textPrimary,
    marginHorizontal: spacing.spacingSm,
  },
  removeButton: {
    marginLeft: "auto",
  },
  iconButton: {
    padding: 10, // Ensures a minimum touch target of 44x44px for a 24px icon
  },
  summaryContainer: {
    backgroundColor: colors.surfaceWhite,
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingMd,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    gap: spacing.spacingSm, // Added gap for rows
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xs, // Smaller margin for summary rows
  },
  summaryText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  summaryAmount: {
    ...typography.body,
    color: colors.textPrimary,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.spacingMd, // Keep larger margin for total
  },
  totalText: {
    ...typography.heading2,
    color: colors.textPrimary,
  },
  totalAmount: {
    ...typography.heading2,
    color: colors.brandPurpleVibrant,
  },
  checkoutButton: {
    width: '100%',
  },
});

export default CartScreen;
