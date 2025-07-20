import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import SearchBar from "../components/common/SearchBar";
import { MOCK_PRODUCTS } from "../utils/mockData";
import ProductCard from "../components/product/ProductCard";
import RecentSearchList from "../components/search/RecentSearchList";
import SearchSuggestions from "../components/search/SearchSuggestions";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Replace 'any' with your Product type
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["T-shirt", "Jeans", "Sneakers"]); // Mock recent searches
  const [suggestions, setSuggestions] = useState<string[]>(["Electronics", "Fashion", "Home & Kitchen"]); // Mock suggestions

  const handleSearch = () => {
    setHasSearched(true);
    // Add current search to recent searches if not already there
    if (searchText && !recentSearches.includes(searchText)) {
      setRecentSearches([searchText, ...recentSearches.slice(0, 4)]); // Keep last 5 searches
    }
    // Simulate search results
    const filtered = MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleRecentSearchPress = (searchTerm: string) => {
    setSearchText(searchTerm);
    setHasSearched(true);
    // Simulate search results for recent search
    const filtered = MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleRemoveRecentSearch = (searchTerm: string) => {
    setRecentSearches(recentSearches.filter(search => search !== searchTerm));
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchText(suggestion);
    setHasSearched(true);
    // Simulate search results for suggestion
    const filtered = MOCK_PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(suggestion.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const renderContent = () => {
    if (searchText === "" && !hasSearched) {
      return (
        <RecentSearchList
          searches={recentSearches}
          onSearchPress={handleRecentSearchPress}
          onRemovePress={handleRemoveRecentSearch}
        />
      );
    } else if (searchText !== "" && !hasSearched) {
      return (
        <SearchSuggestions
          suggestions={suggestions.filter(s => s.toLowerCase().includes(searchText.toLowerCase()))}
          onSuggestionPress={handleSuggestionPress}
        />
      );
    } else if (searchResults.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <MaterialCommunityIcons name="magnify-remove-outline" size={80} color={colors.borderNeutral} />
          <Text style={styles.emptyStateTitle}>Nenhum resultado encontrado</Text>
          <Text style={styles.emptyStateSubText}>Tente um termo diferente</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={searchResults}
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
          numColumns={2}
          columnWrapperStyle={styles.productGrid}
          contentContainerStyle={styles.productList}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} accessibilityLabel="Go back to previous screen">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchBarContainer}>
          <SearchBar
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setHasSearched(false); // Reset hasSearched when text changes
            }}
            onSearch={handleSearch}
            placeholder="Escreva algo..."
          />
        </View>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
  },
  backButton: {
    padding: 10, // Ensures 44x44px touch target
    marginRight: spacing.spacingSm,
  },
  searchBarContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.spacingMd,
  },
  emptyStateTitle: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginTop: spacing.spacingMd,
  },
  emptyStateSubText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.spacingSm,
    textAlign: "center",
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

export default SearchScreen;
