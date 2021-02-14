import * as Notifications from 'expo-notifications';

export function wait(n) {
    return new Promise((resolve) => {
        setTimeout(resolve, n);
    });
}

export async function clearLocalNotification () {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

export function createNotification() {
    return {
        title: "Study Reminder",
        body: "Don't forget to study today 📚",
        sound: true,
        vibrate: true,
        priority: 'high'
    }
}