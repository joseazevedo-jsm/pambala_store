import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { typography } from "../../styles/typography";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSuggestionPress: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSuggestionPress,
}) => {
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => onSuggestionPress(item)}>
      <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} style={styles.icon} />
      <Text style={styles.suggestionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.spacingMd,
    paddingTop: spacing.spacingMd,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.spacingSm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
  },
  icon: {
    marginRight: spacing.spacingSm,
  },
  suggestionText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});

export default SearchSuggestions;
