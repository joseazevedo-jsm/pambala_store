import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
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
    alert(`Product Listed:\nName: ${productName}\nPrice: $${price}\nCategory: ${category}\nCondition: ${condition}`);
    // Clear form
    setProductName("");
    setDescription("");
    setPrice("");
    setOriginalPrice("");
    setCategory("");
    setCondition("");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>List Your Product</Text>

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Vintage Leather Jacket"
        placeholderTextColor={colors.neutralMedium}
        value={productName}
        onChangeText={setProductName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your product in detail..."
        placeholderTextColor={colors.neutralMedium}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 50.00"
        placeholderTextColor={colors.neutralMedium}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Original Price (Optional $)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 75.00 (for discounts)"
        placeholderTextColor={colors.neutralMedium}
        keyboardType="numeric"
        value={originalPrice}
        onChangeText={setOriginalPrice}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Fashion, Electronics, Home & Kitchen"
        placeholderTextColor={colors.neutralMedium}
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
        <MaterialCommunityIcons name="camera-plus-outline" size={40} color={colors.neutralMedium} />
        <Text style={styles.imagePickerText}>Add Images</Text>
      </TouchableOpacity>

      <Button title="List Product" onPress={handleListProduct} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  contentContainer: {
    padding: spacing.md,
    paddingTop: spacing.xl * 2, // Adjust for status bar
  },
  title: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading1,
    color: colors.neutralDark,
    marginBottom: spacing.xl,
    textAlign: "center",
  },
  label: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.bodyLarge,
    color: colors.neutralDark,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surfaceWhite,
    padding: spacing.md,
    borderRadius: 8,
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
    borderWidth: 1,
    borderColor: colors.neutralLight,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  conditionContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  conditionButton: {
    backgroundColor: colors.surfaceWhite,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.neutralLight,
  },
  selectedConditionButton: {
    backgroundColor: colors.brandPrimary,
    borderColor: colors.brandPrimary,
  },
  conditionButtonText: {
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
  },
  selectedConditionButtonText: {
    color: colors.surfaceWhite,
  },
  imagePicker: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutralLight,
    borderStyle: "dashed",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  imagePickerText: {
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.neutralMedium,
    marginTop: spacing.sm,
  },
});

export default SellScreen;