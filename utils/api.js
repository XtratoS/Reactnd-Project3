import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { createNotification } from './helpers';
import { defaultDecks } from './default';

const DATA_KEY = 'Udacity:Reactnd-Project3-Data';
const NOTIFICATION_KEY = 'Udacity:Reactnd-Project3-Notification';

export function getDecks() {
    return new Promise(async function executor(resolve) {
        let data = {};
        const asyncStorageValue = await AsyncStorage.getItem(DATA_KEY);
        if (asyncStorageValue !== null) {
            data = JSON.parse(asyncStorageValue);
        } else {
            data = defaultDecks;
            await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
        }
        resolve(data);
    });
}

export function addCard({ deckId, card }) {
    return new Promise(async function executor(resolve) {
        let data = JSON.parse(await AsyncStorage.getItem(DATA_KEY));
        data[deckId].questions.push(card);
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
        resolve(card);
    });
}

/**
 * Creates a new deck
 * @param {string} title
 * @returns {Promise} a promise which resolves to true if a new deck was created and false if the deck already exists
 */
export function createDeck(title) {
    return new Promise(async function executor(resolve) {
        let data = JSON.parse(await AsyncStorage.getItem(DATA_KEY));
        if (!data[title]) {
            data[title] = {title, questions: []};
            await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
            resolve(true);
        }
        resolve(false);
    });
}

export function removeDeck(title) {
    return new Promise(async function executor(resolve){
        let data = JSON.parse(await AsyncStorage.getItem(DATA_KEY));
        delete data[title];
        await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
        resolve(true);
    });
}

export async function setLocalNotification(time) {
    // REMOVE PREVIOUS NOTIFICATION FROM PHONE SCHEDULE
    let prevNotif = await AsyncStorage.getItem(NOTIFICATION_KEY);
    if (prevNotif) {
        await Notifications.cancelScheduledNotificationAsync(prevNotif)
    }

    // REMOVE PREVIOUS NOTIFICATION FROM ASYNC STORAGE (IF NO NEW ONE)
    if (time === null) {
        return AsyncStorage.removeItem(NOTIFICATION_KEY);
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
        }),
    });

    const date = new Date(time);

    // ADD NEW NOTIFICATION TO PHONE SCHEDULE
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: createNotification(),
        trigger: {
            hour: date.getHours(),
            minute: date.getMinutes(),
            repeats: true,
        }
    });

    // ADD NEW NOTIFICATION TO ASYNC STORAGE
    return AsyncStorage.setItem(NOTIFICATION_KEY, notificationId);
}

export async function getLocalNotification() {
    return new Promise(async (resolve) => {
        let notificationId = await AsyncStorage.getItem(NOTIFICATION_KEY);
        if (!notificationId) {
            resolve(null);
        }
        let notification = (await Notifications.getAllScheduledNotificationsAsync()).find((n) => (n.identifier === notificationId));
        if (!notification) {
            resolve(null);
        }
        resolve(notification);
    });
}