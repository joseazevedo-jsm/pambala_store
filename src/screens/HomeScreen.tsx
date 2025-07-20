import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Platform, StatusBar } from "react-native";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../utils/mockData";
import ProductCard from "../components/product/ProductCard";
import SearchBar from "../components/common/SearchBar";
import Carousel from "../components/common/Carousel";
import CategoryCard from "../components/common/CategoryCard"; // New import
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../types/Product";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Import for category icons

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const HomeScreen = () => {
  const [selectedCondition, setSelectedCondition] = useState<"All" | "New" | "Used">("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // New state for selected category
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const allProducts = MOCK_PRODUCTS; // Display all products by default

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesCondition = selectedCondition === "All" ? true : product.condition === selectedCondition;
    return matchesCategory && matchesCondition;
  });

  const carouselData = [
    { id: "1", imageUrl: "https://via.placeholder.com/800x400/6A11CB/FFFFFF?text=Summer+Sale", title: "Summer Sale!" },
    { id: "2", imageUrl: "https://via.placeholder.com/800x400/480ca8/FFFFFF?text=New+Arrivals", title: "New Arrivals" },
    { id: "3", imageUrl: "https://via.placeholder.com/800x400/10B981/FFFFFF?text=Limited+Time+Offers", title: "Limited Time Offers" },
  ];

  // Mapping for category icons
  const categoryIcons: { [key: string]: keyof typeof MaterialCommunityIcons.glyphMap } = {
    "Electronics": "laptop",
    "Fashion": "hanger",
    "Home & Kitchen": "home-outline",
    "Books": "book-open-outline",
    "Sports": "volleyball",
    "Vehicles": "car",
    "Collectibles": "treasure-chest",
    "Art": "palette",
    "Toys": "toy-brick",
    "Music": "music",
    "Health & Beauty": "face-woman-shimmer",
    "Garden": "flower",
    "Pet Supplies": "paw",
    "Baby": "baby-carriage",
    "Jewelry": "diamond-stone",
    "Crafts": "brush",
    "Food": "food-apple",
    "Services": "account-group",
    "Other": "shape-outline",
  };

  const ListHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Pambala</Text> {/* Logo on the left */}
        <View style={styles.rightIconsContainer}> {/* Container for right-aligned icons */}
          <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.navigate("Search")} accessibilityLabel="Search products">
            <MaterialCommunityIcons name="magnify" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.navigate("Cart")} accessibilityLabel="Go to cart">
            <MaterialCommunityIcons name="cart-outline" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carousel - make it full width by using negative margins to offset parent padding */}
      <View style={styles.carouselWrapper}>
        <Carousel data={carouselData} autoplay style={styles.carouselStyle} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MOCK_CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CategoryCard
              categoryName={item}
              iconName={categoryIcons[item] || "shape-outline"}
              onPress={() => setSelectedCategory(item === selectedCategory ? null : item)}
              isActive={item === selectedCategory}
            />
          )}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Condition</Text>
        <View style={styles.conditionFilterContainer}>
          <TouchableOpacity
            style={[
              styles.conditionButton,
              selectedCondition === "All" && styles.selectedConditionButton,
            ]}
            onPress={() => setSelectedCondition("All")}
          >
            <Text
              style={[
                styles.conditionButtonText,
                selectedCondition === "All" && styles.selectedConditionButtonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.conditionButton,
              selectedCondition === "New" && styles.selectedConditionButton,
            ]}
            onPress={() => setSelectedCondition("New")}
          >
            <Text
              style={[
                styles.conditionButtonText,
                selectedCondition === "New" && styles.selectedConditionButtonText,
              ]}
            >
              New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.conditionButton,
              selectedCondition === "Used" && styles.selectedConditionButton,
            ]}
            onPress={() => setSelectedCondition("Used")}
          >
            <Text
              style={[
                styles.conditionButtonText,
                selectedCondition === "Used" && styles.selectedConditionButtonText,
              ]}
            >
              Used
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <ProductCard
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              onPress={() => navigation.navigate("ProductDetail", { productId: item.id })}
            />
          </View>
        )}
        numColumns={2} // Display in 2 columns
        columnWrapperStyle={styles.productGrid}
        contentContainerStyle={styles.productList}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm, // Increased vertical padding for a taller header
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12, // Added border radius
    shadowColor: "#000", // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
    marginHorizontal: spacing.xs, // Reduced horizontal margin for a wider header
    marginTop: spacing.spacingMd, // Added top margin
  },
  headerIconContainer: {
    padding: 10, // Ensures 44x44px touch target
  },
  logoText: {
    ...typography.heading1, // Using Heading 1 for logo text
    color: colors.brandPurpleDark, // Example color for logo
  },
  rightIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carouselStyle: {
    // Remove marginTop if not needed, or keep if you want vertical spacing
    marginTop: spacing.spacingLg,
  },
  carouselWrapper: {
    marginHorizontal: -spacing.spacingMd, // Counteract parent horizontal padding
  },
  section: {
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingMd,
  },
  sectionTitle: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.spacingMd,
  },
  categoryList: {
    paddingBottom: spacing.spacingSm,
  },
  conditionFilterContainer: {
    flexDirection: "row",
    marginBottom: spacing.spacingMd,
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.xs,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  conditionButton: {
    flex: 1,
    paddingVertical: spacing.spacingMd,
    paddingHorizontal: spacing.spacingMd,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedConditionButton: {
    backgroundColor: colors.brandPurpleVibrant,
  },
  conditionButtonText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  selectedConditionButtonText: {
    color: colors.surfaceWhite,
  },
  productList: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingMd,
    paddingTop: spacing.spacingXl * 2, // Adjust based on header height
  },
  productGrid: {
    justifyContent: "space-between",
    marginHorizontal: -spacing.spacingSm,
    marginBottom: spacing.spacingMd,
  },
  productItem: {
    flex: 1,
    marginHorizontal: spacing.spacingSm,
    marginBottom: spacing.spacingMd,
  },
});

export default HomeScreen;
