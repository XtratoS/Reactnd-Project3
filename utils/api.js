import AsyncStorage from '@react-native-async-storage/async-storage';
import { wait } from './helpers';
const ASYNCSTORAGE_KEY = 'Reactnd-Project3-25';
import { defaultDecks } from './default';

export function getDecks() {
    return new Promise(async function executor(resolve, reject) {
        let data = {};
        await wait(500);
        const asyncStorageValue = await AsyncStorage.getItem(ASYNCSTORAGE_KEY);
        if (asyncStorageValue !== null) {
            data = JSON.parse(asyncStorageValue);
        } else {
            data = defaultDecks;
            await AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(data));
        }
        resolve(data);
    });
}

// export function getDeck(id) {
//     return new Promise(async function executor(resolve, reject) {
//         await wait(1000);
//         resolve(
//             data[id] ? data[id] : {}
//         );
//     })
// }

export function addCard({ deckId, card }) {
    return new Promise(async function executor(resolve, reject) {
        await wait(500);
        let data = JSON.parse(await AsyncStorage.getItem(ASYNCSTORAGE_KEY));
        // console.log(data);
        data[deckId].questions.push(card);
        // console.log(data);
        await AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(data));
        // console.log(await AsyncStorage.getItem(ASYNCSTORAGE_KEY));
        resolve(card);
    });
}

/**
 * Creates a new deck
 * @param {string} title
 * @returns {Promise} a promise which resolves to true if a new deck was created and false if the deck already exists
 */
export function createDeck(title) {
    return new Promise(async function executor(resolve, reject) {
        await wait(500);
        let data = JSON.parse(await AsyncStorage.getItem(ASYNCSTORAGE_KEY));
        if (!data[title]) {
            data[title] = {title, questions: []};
            await AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(data));
            resolve(true);
        }
        resolve(false);
    })
}