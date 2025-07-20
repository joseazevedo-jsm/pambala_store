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
import { typography } from "../styles/typography";

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
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brandPurpleVibrant, // Updated color
        tabBarInactiveTintColor: colors.textSecondary, // Updated color
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
          ...typography.label, // Use typography.label for base styles
          // Apply semibold for focused state
          fontFamily: route.name === 'HomeTab' || route.name === 'SellTab' || route.name === 'SavedTab' || route.name === 'NotificationTab' || route.name === 'AccountTab' ? typography.fontFamily.interSemiBold : typography.fontFamily.interMedium, // Apply semibold for active labels
          marginTop: -5,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ size, focused }) => (
            <TabIcon name="home" size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SellTab"
        component={SellScreen}
        options={{
          title: "Sell",
          tabBarIcon: ({ size, focused }) => (
            <TabIcon name="tag-outline" size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SavedTab"
        component={SavedScreen}
        options={{
          title: "Saved",
          tabBarIcon: ({ size, focused }) => (
            <TabIcon name="heart-outline" size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationScreen}
        options={{
          title: "Alerts", // Changed to "Alerts"
          tabBarIcon: ({ size, focused }) => (
            <TabIcon name="bell-outline" size={size} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ size, focused }) => (
            <TabIcon name="account-outline" size={size} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;