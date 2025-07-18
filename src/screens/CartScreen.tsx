import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

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

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="cart-off" size={80} color={colors.neutralLight} />
        <Text style={styles.emptyText}>Your cart is empty!</Text>
        <Text style={styles.emptySubText}>Start adding some amazing products.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <PriceDisplay price={item.price} style={styles.itemPrice} />
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                  <MaterialCommunityIcons name="minus-circle-outline" size={24} color={colors.neutralMedium} />
                </TouchableOpacity>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                  <MaterialCommunityIcons name="plus-circle-outline" size={24} color={colors.neutralMedium} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                  <MaterialCommunityIcons name="delete-outline" size={24} color={colors.feedbackError} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.summaryContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <Button title="Proceed to Checkout" onPress={() => navigation.navigate("Checkout")} />
      </View>
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
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.bodyLarge,
    color: colors.neutralDark,
  },
  itemPrice: {
    marginTop: spacing.xs,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  itemQuantity: {
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
    marginHorizontal: spacing.sm,
  },
  removeButton: {
    marginLeft: "auto",
  },
  summaryContainer: {
    backgroundColor: colors.surfaceWhite,
    padding: spacing.md,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  totalText: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading2,
    color: colors.neutralDark,
  },
  totalAmount: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading2,
    color: colors.brandPrimary,
  },
});

export default CartScreen;
