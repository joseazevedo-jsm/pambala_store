import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { spacing } from "../../styles/spacing";
import { typography } from "../../styles/typography";

interface RecentSearchListProps {
  searches: string[];
  onSearchPress: (searchTerm: string) => void;
  onRemovePress: (searchTerm: string) => void;
}

const RecentSearchList: React.FC<RecentSearchListProps> = ({
  searches,
  onSearchPress,
  onRemovePress,
}) => {
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.searchItem} onPress={() => onSearchPress(item)} accessibilityLabel={`Search for ${item}`}>
      <MaterialCommunityIcons name="history" size={20} color={colors.textSecondary} style={styles.icon} />
      <Text style={styles.searchText}>{item}</Text>
      <TouchableOpacity onPress={() => onRemovePress(item)} style={styles.removeButton} accessibilityLabel={`Remove ${item} from recent searches`}>
        <MaterialCommunityIcons name="close-circle-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisas Recentes</Text>
      {searches.length > 0 ? (
        <FlatList
          data={searches}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhuma pesquisa recente.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.spacingMd,
    paddingTop: spacing.spacingMd,
  },
  title: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginBottom: spacing.spacingMd,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.spacingSm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
  },
  icon: {
    marginRight: spacing.spacingSm,
  },
  searchText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  removeButton: {
    padding: spacing.xs, // Ensure touch target
  },
  noResultsText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.spacingMd,
  },
});

export default RecentSearchList;
