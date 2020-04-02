import {AsyncStorage} from 'react-native';
import {Notifications } from "expo";
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'UdacityMobileFlashCardAppNotifications';

export const createNotification = () => {
    return {
        title: 'Checkout the Mobile Flashcards App',
        body: "Don't forgot to play the quiz on the app today",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
};

export const setLocalNotification = async () => {
    try {
        let notificationData = await AsyncStorage.getItem(NOTIFICATION_KEY);
        notificationData = JSON.parse(notificationData);
        if (notificationData) {

        } else {
            const status = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            if (status === 'granted') {
                await Notifications.cancelAllScheduledNotificationsAsync()
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);
                await Notifications.scheduleLocalNotificationAsync(createNotification(), {time: tomorrow, repeat: 'day'});
                await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
        }
    } catch (error) {
        console.log(error)
    }
};

export const clearLocalNotification = async () => {
    try {
        await AsyncStorage.removeItem(NOTIFICATION_KEY);
    } catch (error) {
        console.log(error)
    }
};