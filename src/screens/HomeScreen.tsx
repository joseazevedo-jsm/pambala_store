import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../utils/mockData";
import ProductCard from "../components/product/ProductCard";
import SearchBar from "../components/common/SearchBar";
import Carousel from "../components/common/Carousel";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../types/Product";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<"All" | "New" | "Used">("All");
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCondition = selectedCondition === "All" || product.condition === selectedCondition;
    return matchesSearch && matchesCondition;
  });

  const carouselData = [
    { id: "1", imageUrl: "https://via.placeholder.com/800x400/2D6A4F/FFFFFF?text=Summer+Sale" },
    { id: "2", imageUrl: "https://via.placeholder.com/800x400/F7B801/FFFFFF?text=New+Arrivals" },
    { id: "3", imageUrl: "https://via.placeholder.com/800x400/10B981/FFFFFF?text=Limited+Time+Offers" },
  ];

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Discover</Text>
        </View>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search products..."
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
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryButtonText}>{item}</Text>
            </TouchableOpacity>
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
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl, // Adjusted for better visual balance
    paddingBottom: spacing.md,
    backgroundColor: colors.backgroundPrimary, // Use primary background for header area
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerText: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.display, // Use Display size for main title
    color: colors.neutralDark,
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.heading2,
    color: colors.neutralDark,
    marginBottom: spacing.md,
  },
  categoryList: {
    paddingBottom: spacing.sm,
  },
  categoryButton: {
    backgroundColor: colors.surfaceWhite,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 10, // Smaller border radius for category buttons
    marginRight: spacing.sm,
    shadowColor: colors.neutralDark, // Apply shadow for card-like appearance
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2, // For Android shadow
  },
  categoryButtonText: {
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
  },
  conditionFilterContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
    backgroundColor: colors.surfaceWhite, // Container for condition buttons
    borderRadius: 12,
    padding: spacing.xs, // Small padding inside the container
    shadowColor: colors.neutralDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  conditionButton: {
    flex: 1, // Distribute space evenly
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8, // Button specific border radius
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedConditionButton: {
    backgroundColor: colors.brandPrimary,
  },
  conditionButtonText: {
    fontFamily: typography.fontFamily.interSemiBold, // Semibold for button text
    fontSize: typography.sizes.body,
    color: colors.neutralMedium, // Default text color for inactive buttons
  },
  selectedConditionButtonText: {
    color: colors.surfaceWhite,
  },
  productList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  productGrid: {
    justifyContent: "space-between",
    marginHorizontal: -spacing.sm, // Counteract item margin
    marginBottom: spacing.md,
  },
  productItem: {
    flex: 1,
    marginHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
});

export default HomeScreen;
