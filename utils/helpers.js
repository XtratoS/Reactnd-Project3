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
        body: "Don't forget to study today 📚📚📚",
        sound: true,
        vibrate: true,
        priority: 'high'
    }
}

export function formatTime(input) {
    let date;
    if (typeof(input) === 'number') {
        date = new Date(input)
    }
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let AP = hrs > 11 ? 'PM' : 'AM';
    hrs = hrs > 9 ? hrs : `0${hrs}`;
    mins = mins > 9 ? mins : `0${mins}`;
    return `${hrs}: ${mins} ${AP}`;
}