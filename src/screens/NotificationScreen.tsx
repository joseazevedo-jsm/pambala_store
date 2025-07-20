import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../styles/colors";
import { typography } from "../styles/typography";
import { spacing } from "../styles/spacing";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Your order has been shipped!",
    message: "Order #12345 is on its way. Track your package now.",
    timestamp: "2025-07-17T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    title: "New deals on Electronics!",
    message: "Check out our latest discounts on headphones and cameras.",
    timestamp: "2025-07-16T15:30:00Z",
    read: true,
  },
  {
    id: "3",
    title: "Price drop on Stylish Leather Handbag",
    message: "The handbag you saved is now 10% off!",
    timestamp: "2025-07-15T09:00:00Z",
    read: false,
  },
];

const NotificationScreen = () => {
  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={[styles.notificationItem, item.read ? styles.read : styles.unread]}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationTimestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Notifications</Text>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    paddingTop: spacing.spacingXl * 2, // Adjust for status bar
  },
  headerTitle: {
    fontFamily: typography.fontFamily.interBold,
    fontSize: typography.heading1.fontSize,
    color: colors.textPrimary,
    paddingHorizontal: spacing.spacingMd,
    marginBottom: spacing.spacingMd,
  },
  listContent: {
    paddingHorizontal: spacing.spacingMd,
    paddingBottom: spacing.spacingMd,
  },
  notificationItem: {
    backgroundColor: colors.surfaceWhite,
    borderRadius: 12,
    padding: spacing.spacingMd,
    marginBottom: spacing.spacingMd,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  read: {
    opacity: 0.7,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.brandPurpleVibrant,
  },
  notificationTitle: {
    fontFamily: typography.fontFamily.interSemiBold,
    fontSize: typography.body.fontSize, // No bodyLarge, using body
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  notificationMessage: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.body.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notificationTimestamp: {
    fontFamily: typography.fontFamily.interRegular,
    fontSize: typography.label.fontSize,
    color: colors.textSecondary,
    textAlign: "right",
  },
});

export default NotificationScreen;
