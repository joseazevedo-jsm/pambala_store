import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SellScreen from "../screens/SellScreen";
import SavedScreen from "../screens/SavedScreen";
import MessageScreen from "../screens/MessageScreen";
import AccountScreen from "../screens/AccountScreen";
import TabIcon from "../components/navigation/TabIcon";
import { colors } from "../styles/colors";
import { Platform } from "react-native";
import NotificationScreen from '../screens/NotificationScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.brandPrimary,
        tabBarInactiveTintColor: colors.neutralMedium,
        tabBarStyle: {
          backgroundColor: colors.surfaceWhite,
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          // Glassmorphism effect (basic implementation, might need more advanced libraries for full effect)
          ...(Platform.OS === "ios" && {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.05,
            shadowRadius: 5,
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-Medium",
          marginTop: -5,
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SellTab"
        component={SellScreen}
        options={{
          title: "Sell",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="tag-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="heart-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="bell-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="account-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;