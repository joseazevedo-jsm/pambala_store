import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform } from "react-native";
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Alertas</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
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
    paddingHorizontal: spacing.spacingMd,
    paddingVertical: spacing.spacingSm,
    backgroundColor: colors.surfaceWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderNeutral,
    marginBottom: spacing.spacingMd,
  },
  headerTitle: {
    ...typography.heading1,
    color: colors.textPrimary,
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  read: {
    opacity: 0.7,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.brandPurpleVibrant,
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
});

export default NotificationScreen;
