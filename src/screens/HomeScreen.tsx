import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
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
  const [searchText, setSearchText] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<"All" | "New" | "Used">("All");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // New state for selected category
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = searchText ? product.name.toLowerCase().includes(searchText.toLowerCase()) : true;
    const matchesCondition = selectedCondition === "All" || product.condition === selectedCondition;
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    return matchesSearch && matchesCondition && matchesCategory;
  });

  const carouselData = [
    { id: "1", imageUrl: "https://via.placeholder.com/800x400/6A11CB/FFFFFF?text=Summer+Sale" }, // Updated color
    { id: "2", imageUrl: "https://via.placeholder.com/800x400/480ca8/FFFFFF?text=New+Arrivals" }, // Updated color
    { id: "3", imageUrl: "https://via.placeholder.com/800x400/10B981/FFFFFF?text=Limited+Time+Offers" }, // Updated color
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
      <View style={styles.searchBlockContainer}>
        <Text style={styles.searchBlockTitle}>PESQUISAR</Text>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Escreva algo..."
        />
      </View>

      <Carousel data={carouselData} autoplay />

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
    backgroundColor: colors.backgroundLight, // Updated background color
  },
  searchBlockContainer: {
    backgroundColor: colors.brandPurpleDark,
    padding: spacing.spacingLg,
    borderRadius: 16,
    marginTop: spacing.spacingMd, // Adjusted margin top
    marginHorizontal: spacing.spacingMd, // Added horizontal margin
  },
  searchBlockTitle: {
    ...typography.heading2, // Using Heading 2 style
    color: colors.surfaceWhite,
    marginBottom: spacing.spacingMd,
  },
  section: {
    paddingHorizontal: spacing.spacingMd, // Changed to horizontal padding
    paddingVertical: spacing.spacingMd, // Added vertical padding
  },
  sectionTitle: {
    ...typography.heading2, // Using Heading 2 style
    color: colors.textPrimary, // Updated text color
    marginBottom: spacing.spacingMd,
  },
  categoryList: {
    paddingBottom: spacing.spacingSm,
  },
  conditionFilterContainer: {
    flexDirection: "row",
    marginBottom: spacing.spacingMd,
    backgroundColor: colors.surfaceWhite, // Container for condition buttons
    borderRadius: 12,
    padding: spacing.xs, // Small padding inside the container
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  conditionButton: {
    flex: 1, // Distribute space evenly
    paddingVertical: spacing.spacingSm,
    paddingHorizontal: spacing.spacingMd,
    borderRadius: 8, // Button specific border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedConditionButton: {
    backgroundColor: colors.brandPurpleVibrant, // Updated color
  },
  conditionButtonText: {
    ...typography.body, // Using body style
    color: colors.textSecondary, // Default text color for inactive buttons
  },
  selectedConditionButtonText: {
    color: colors.surfaceWhite,
  },
  productList: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingMd,
  },
  productGrid: {
    justifyContent: "space-between",
    marginHorizontal: -spacing.spacingSm, // Counteract item margin
    marginBottom: spacing.spacingMd,
  },
  productItem: {
    flex: 1,
    marginHorizontal: spacing.spacingSm,
    marginBottom: spacing.spacingMd,
  },
});

export default HomeScreen;
