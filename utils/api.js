import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import { createNotification } from './helpers';
import { defaultDecks } from './default';

const DATA_KEY = 'Udacity:Reactnd-Project3-Data';
const NOTIFICATION_KEY = 'Udacity:Reactnd-Project3-Notification';
const CHECKIN_KEY = 'Udacity:Reactnd-Project3-Checkin';

const MS_IN_DAY = 24*60*60*1000;

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
      return;
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

function setNotificationHandler() {
  return new Promise(async (resolve) => {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    resolve();
  })
}

function handleSetNotification(time) {
  return new Promise(async (resolve) => {
    await removeLocalNotification();

    let lastCheckinStart = await AsyncStorage.getItem(CHECKIN_KEY);

    // IF NOTIFICATION ALREADY SENT TODAY (OR) USER ALREADY SOLVED A QUIZ TODAY
    if (time <= Date.now() || lastCheckinStart == getDayStart(Date.now())) {
      time += MS_IN_DAY;
    }

    let date = (typeof time === 'object') ? time : new Date(time);
    date.setSeconds(0, 0);

    let notificationId = await Notifications.scheduleNotificationAsync({
      content: createNotification(),
      trigger: {
        date
      }
    });
    await AsyncStorage.setItem(NOTIFICATION_KEY, notificationId);

    resolve(time);
  });
}

function removeLocalNotification() {
  return new Promise(async (resolve) => {
    let notificationId = await AsyncStorage.getItem(NOTIFICATION_KEY);
    if (!notificationId) {
      resolve();
      return;
    }
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    resolve();
  });
}

export function setLocalNotification(time) {
  return new Promise(async (resolve) => {
    await removeLocalNotification();
    if (time) {
      await setNotificationHandler();
      await handleSetNotification(time);
    }
    resolve();
  });
}

export function getLocalNotification() {
  return new Promise(async (resolve) => {
    let notificationId = await AsyncStorage.getItem(NOTIFICATION_KEY);
    if (!notificationId) {
      resolve(null);
      return;
    }

    let notification = (await Notifications.getAllScheduledNotificationsAsync())
      .find((n) => (n.identifier === notificationId));
    if (!notification) {
      resolve(null);
      return;
    }

    resolve(notification);
  });
}

function getDayStart(timestamp) {
  return Math.floor(timestamp / MS_IN_DAY) * MS_IN_DAY;
}

async function scheduleNextNotification() {
  return new Promise(async () => {
    let notification = await getLocalNotification();
    if (!notification) {
      resolve();
      return;
    }

    let notifStart = getDayStart(notification.trigger.value);
    let todayStart = getDayStart(Date.now());

    if (notifStart === todayStart) {
      setLocalNotification(notification.trigger.value + MS_IN_DAY);
    }

    resolve();
  })
}

export function checkIn() {
  return new Promise(async (resolve) => {
    let lastCheckinStart = await AsyncStorage.getItem(CHECKIN_KEY);
    let todayStart = getDayStart(Date.now());

    if (lastCheckinStart == todayStart) {
      resolve();
      return;
    }

    await AsyncStorage.setItem(CHECKIN_KEY, todayStart.toString());
    await scheduleNextNotification();

    resolve();
  });
}

export function clearLocalNotifications() {
  return new Promise(async (resolve) => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    resolve();
  });
}