import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';

interface CategoryCardProps {
  categoryName: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryName,
  iconName,
  onPress,
  isActive = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isActive && styles.activeCard,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={28}
        color={isActive ? colors.brandPurpleVibrant : colors.brandPurpleDark}
      />
      <Text
        style={[
          styles.categoryLabel,
          isActive && styles.activeCategoryLabel,
        ]}
      >
        {categoryName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100, // Fixed width
    height: 100, // Fixed height
    padding: spacing.spacingSm, // Adjusted padding for fixed size
    borderRadius: 16,
    backgroundColor: colors.surfaceWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.spacingSm, // Spacing between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCard: {
    borderWidth: 2,
    borderColor: colors.brandPurpleVibrant,
  },
  categoryLabel: {
    ...typography.label,
    marginTop: spacing.xs,
    color: colors.textPrimary,
    textAlign: 'center', // Center text
    flexWrap: 'wrap', // Allow text to wrap
  },
  activeCategoryLabel: {
    color: colors.brandPurpleDark,
  },
});

export default CategoryCard;
