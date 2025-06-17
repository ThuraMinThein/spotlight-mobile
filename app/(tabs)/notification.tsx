import { COLORS } from '@/constants/theme';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/notifications.style';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Loader } from '../components/Loader';
import Notifications from '../components/Notification';

export default function Notification() {

    const notifications = useQuery(api.notifications.getNotifications);

    if (notifications === undefined) return <Loader />;
    if (notifications.length === 0) return <NoNotificationFound />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <FlatList
                data={notifications}
                renderItem={({ item }) => <Notifications notification={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
}

function NoNotificationFound() {
    return (
        <View style={[styles.container, styles.centered]}>
            <Ionicons name='notifications-outline' size={48} color={COLORS.primary} />
            <Text style={{ fontSize: 20, color: COLORS.white }}>No notifications yet</Text>
        </View>
    )
}