import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";

export type RootStackParamList = {
  TabNavigator: undefined;
  ProductDetail: { productId: string };
  Checkout: undefined;
  Login: undefined;
  Register: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {isAuthenticated ? (
        <>
          <RootStack.Screen name="TabNavigator" component={TabNavigator} />
          <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <RootStack.Screen name="Checkout" component={CheckoutScreen} />
          <RootStack.Screen name="Search" component={SearchScreen} />
          <RootStack.Screen name="Cart" component={CartScreen} />
        </>
      ) : (
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;