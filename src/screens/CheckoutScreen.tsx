import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import Button from "../components/common/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Shipping Address", component: <ShippingAddressStep /> },
    { title: "Payment Method", component: <PaymentMethodStep /> },
    { title: "Order Summary", component: <OrderSummaryStep /> },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step, complete order
      alert("Order Placed Successfully!");
      navigation.goBack(); // Or navigate to a confirmation screen
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.neutralDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />{/* Spacer */}
      </View>

      <View style={styles.progressBarContainer}>
        {steps.map((step, index) => (
          <View key={index} style={styles.progressBarStep}>
            <View
              style={[
                styles.progressBarDot,
                index <= currentStep ? styles.progressBarDotActive : styles.progressBarDotInactive,
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.progressBarLine,
                  index < currentStep ? styles.progressBarLineActive : styles.progressBarLineInactive,
                ]}
              />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.stepTitle}>{steps[currentStep].title}</Text>

      <ScrollView style={styles.content}>
        {steps[currentStep].component}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={currentStep === steps.length - 1 ? "Place Order" : "Next"}
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

// Placeholder Components for each step
const ShippingAddressStep = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Enter your shipping address details here.</Text>
  </View>
);

const PaymentMethodStep = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Select your payment method.</Text>
  </View>
);

const OrderSummaryStep = () => (
  <View style={styles.stepContainer}>
    <Text style={styles.stepText}>Review your order summary.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    paddingTop: spacing.xl * 1.5, // Adjust for status bar
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutralLight,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.sizes.heading2,
    color: colors.neutralDark,
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceWhite,
  },
  progressBarStep: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  progressBarDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressBarDotActive: {
    backgroundColor: colors.brandPrimary,
  },
  progressBarDotInactive: {
    backgroundColor: colors.neutralLight,
  },
  progressBarLine: {
    height: 2,
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  progressBarLineActive: {
    backgroundColor: colors.brandPrimary,
  },
  progressBarLineInactive: {
    backgroundColor: colors.neutralLight,
  },
  stepTitle: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading1,
    color: colors.neutralDark,
    textAlign: "center",
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  stepContainer: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.md,
    minHeight: 200, // Ensure some height for content
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.bodyLarge,
    color: colors.neutralMedium,
    textAlign: "center",
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.surfaceWhite,
    borderTopWidth: 1,
    borderTopColor: colors.neutralLight,
  },
});

export default CheckoutScreen;
