import AsyncStorage from '@react-native-async-storage/async-storage';
import { wait } from './helpers';
const ASYNCSTORAGE_KEY = 'Reactnd-Project3-22';

export function getDecks() {
    return new Promise(async function executor(resolve, reject) {
        let data = {};
        await wait(1000);
        const asyncStorageValue = await AsyncStorage.getItem(ASYNCSTORAGE_KEY);
        if (asyncStorageValue !== null) {
            data = JSON.parse(asyncStorageValue);
            for (let item in data) {
                data[item].id = item
            }
        } else {
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

export function addCard(deckId, card) {
    return new Promise(async function executor(resolve, reject) {
        await wait(500);
        let data = JSON.parse(await AsyncStorage.getItem(ASYNCSTORAGE_KEY));
        data[deckId].questions.push(card);
        await AsyncStorage.setItem(ASYNCSTORAGE_KEY, JSON.stringify(data));
        resolve(card);
    });
}