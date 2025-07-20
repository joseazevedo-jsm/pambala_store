import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setAuthTokens } from "../store/authSlice";
import { colors } from "../styles/colors";
import { spacing } from "../styles/spacing";
import { typography } from "../styles/typography";
import Button from "../components/common/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // In a real app, you'd send these credentials to an API to register
    // For now, we'll simulate a successful registration and login
    dispatch(setAuthTokens({ userToken: "mock-token-new-user", userId: "user-new" }));
    alert("Registration Successful!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.neutralMedium}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.neutralMedium}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={colors.neutralMedium}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Login here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    padding: spacing.spacingMd,
  },
  title: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.heading1.fontSize,
    color: colors.textPrimary,
    marginBottom: spacing.spacingXl,
  },
  input: {
    width: "100%",
    backgroundColor: colors.surfaceWhite,
    padding: spacing.spacingMd,
    borderRadius: 8,
    marginBottom: spacing.spacingMd,
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.body.fontSize,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderNeutral,
  },
  loginText: {
    marginTop: spacing.spacingMd,
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.body.fontSize,
    color: colors.brandPurpleDark,
  },
});

export default RegisterScreen;
