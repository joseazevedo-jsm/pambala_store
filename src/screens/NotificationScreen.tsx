import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetScreen?: string; // Optional: Screen to navigate to
  targetParams?: object; // Optional: Params for the target screen
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Your order has been shipped!",
    message: "Order #12345 is on its way. Track your package now.",
    timestamp: "2025-07-17T10:00:00Z",
    read: false,
    targetScreen: "ProductDetail",
    targetParams: { productId: "1" }, // Example: navigate to product detail
  },
  {
    id: "2",
    title: "New deals on Electronics!",
    message: "Check out our latest discounts on headphones and cameras.",
    timestamp: "2025-07-16T15:30:00Z",
    read: true,
    targetScreen: "HomeTab", // Example: navigate to home screen
  },
  {
    id: "3",
    title: "Price drop on Stylish Leather Handbag",
    message: "The handbag you saved is now 10% off!",
    timestamp: "2025-07-15T09:00:00Z",
    read: false,
    targetScreen: "ProductDetail",
    targetParams: { productId: "3" }, // Example: navigate to product detail
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const toggleReadStatus = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: !notif.read } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read ? styles.read : styles.unread]}
      onPress={() => {
        toggleReadStatus(item.id);
        if (item.targetScreen) {
          navigation.navigate(item.targetScreen, item.targetParams);
        }
      }} // Toggle read status and navigate on press
    >
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, !item.read && styles.unreadTitle]}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleReadStatus(item.id)} style={styles.readToggleButton} accessibilityLabel={item.read ? "Mark as unread" : "Mark as read"}>
        <MaterialCommunityIcons
          name={item.read ? "eye-off-outline" : "eye-outline"}
          size={20}
          color={colors.textSecondary}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Alertas</Text>
      <TouchableOpacity onPress={markAllAsRead} style={styles.markAllReadButton} accessibilityLabel="Mark all notifications as read">
        <MaterialCommunityIcons name="check-all" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={(
          <View style={styles.emptyStateContainer}>
            <MaterialCommunityIcons name="bell-off-outline" size={80} color={colors.borderNeutral} />
            <Text style={styles.emptyStateText}>Nenhuma notificação aqui!</Text>
            <Text style={styles.emptyStateSubText}>Você está em dia com suas notificações.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute items
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
    marginBottom: spacing.spacingMd,
  },
  backButton: {
    padding: 10, // Ensures 44x44px touch target
    marginRight: spacing.spacingSm,
  },
  headerTitle: {
    ...typography.heading1,
    color: colors.textPrimary,
    flex: 1, // Allow title to take remaining space
    textAlign: "center", // Center the title
  },
  markAllReadButton: {
    padding: 10, // Ensures 44x44px touch target
    marginLeft: spacing.spacingSm,
  },
  listContent: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingMd,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.spacingMd,
    marginBottom: spacing.spacingMd,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationContent: {
    flex: 1,
    marginRight: spacing.spacingSm,
  },
  read: {
    backgroundColor: colors.backgroundLight, // Lighter background for read
    opacity: 0.8, // Slightly less opaque
  },
  unread: {
    backgroundColor: colors.surfaceWhite, // White background for unread
    borderLeftWidth: 4,
    borderLeftColor: colors.brandPurpleVibrant,
  },
  unreadTitle: {
    fontWeight: 'bold', // Make unread titles bold
  },
  notificationTitle: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  notificationMessage: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notificationTimestamp: {
    ...typography.label,
    color: colors.textSecondary,
    textAlign: "right",
  },
  readToggleButton: {
    padding: 10, // Ensures 44x44px touch target
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.spacingMd,
    marginTop: spacing.spacingXl, // Add some top margin
  },
  emptyStateText: {
    ...typography.heading2,
    color: colors.textPrimary,
    marginTop: spacing.spacingMd,
  },
  emptyStateSubText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.spacingSm,
    textAlign: "center",
  },
});

export default NotificationScreen;
