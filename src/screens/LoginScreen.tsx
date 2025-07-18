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

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // In a real app, you'd send these credentials to an API
    // For now, we'll simulate a successful login with mock tokens
    if (email === "test@example.com" && password === "password") {
      dispatch(setAuthTokens({ userToken: "mock-token-123", userId: "user-1" }));
      alert("Login Successful!");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>Don't have an account? Register here.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.sizes.heading1,
    color: colors.neutralDark,
    marginBottom: spacing.xl,
  },
  input: {
    width: "100%",
    backgroundColor: colors.surfaceWhite,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.sizes.body,
    color: colors.neutralDark,
    borderWidth: 1,
    borderColor: colors.neutralLight,
  },
  registerText: {
    marginTop: spacing.md,
    fontFamily: typography.fontFamily.interMedium,
    fontSize: typography.sizes.body,
    color: colors.brandPrimary,
  },
});

export default LoginScreen;
