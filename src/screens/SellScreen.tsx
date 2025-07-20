import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Platform } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";
import Button from "../components/common/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SellScreen = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState<"New" | "Used" | "">("");

  const handleListProduct = () => {
    // In a real app, this would send data to a backend API
    if (!productName || !description || !price || !category || !condition) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`Product Listed:\nName: ${productName}\nPrice: ${price}\nCategory: ${category}\nCondition: ${condition}`);
    // Clear form
    setProductName("");
    setDescription("");
    setPrice("");
    setOriginalPrice("");
    setCategory("");
    setCondition("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>List Your Product</Text>

        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Vintage Leather Jacket"
          placeholderTextColor={colors.textSecondary}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your product in detail..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Price ($)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 50.00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <Text style={styles.label}>Original Price (Optional $)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 75.00 (for discounts)"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          value={originalPrice}
          onChangeText={setOriginalPrice}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Fashion, Electronics, Home & Kitchen"
          placeholderTextColor={colors.textSecondary}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Condition</Text>
        <View style={styles.conditionContainer}>
          <TouchableOpacity
            style={[
              styles.conditionButton,
              condition === "New" && styles.selectedConditionButton,
            ]}
            onPress={() => setCondition("New")}
          >
            <Text
              style={[
                styles.conditionButtonText,
                condition === "New" && styles.selectedConditionButtonText,
              ]}
            >
              New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.conditionButton,
              condition === "Used" && styles.selectedConditionButton,
            ]}
            onPress={() => setCondition("Used")}
          >
            <Text
              style={[
                styles.conditionButtonText,
                condition === "Used" && styles.selectedConditionButtonText,
              ]}
            >
              Used
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Product Images</Text>
        <TouchableOpacity style={styles.imagePicker}>
          <MaterialCommunityIcons name="camera-plus-outline" size={40} color={colors.textSecondary} />
          <Text style={styles.imagePickerText}>Add Images</Text>
        </TouchableOpacity>

        <Button title="List Product" onPress={handleListProduct} variant="primary" />
      </ScrollView>
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
  contentContainer: {
    padding: spacing.spacingMd,
    paddingTop: Platform.OS === 'ios' ? spacing.spacingLg : spacing.spacingMd, // Adjust for status bar
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
    marginBottom: spacing.spacingXl,
    textAlign: "center",
  },
  label: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    marginTop: spacing.spacingMd,
  },
  input: {
    backgroundColor: colors.surfaceWhite,
    padding: spacing.spacingMd,
    borderRadius: 8,
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderNeutral,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  conditionContainer: {
    flexDirection: "row",
    marginBottom: spacing.spacingMd,
  },
  conditionButton: {
    backgroundColor: colors.surfaceWhite,
    paddingVertical: spacing.spacingSm,
    paddingHorizontal: spacing.spacingMd,
    borderRadius: 20,
    marginRight: spacing.spacingSm,
    borderWidth: 1,
    borderColor: colors.borderNeutral,
  },
  selectedConditionButton: {
    backgroundColor: colors.brandPurpleVibrant,
    borderColor: colors.brandPurpleVibrant,
  },
  conditionButtonText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  selectedConditionButtonText: {
    color: colors.surfaceWhite,
  },
  imagePicker: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderNeutral,
    borderStyle: "dashed",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.spacingXl,
  },
  imagePickerText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.spacingSm,
  },
});

export default SellScreen;
