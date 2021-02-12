import AsyncStorage from '@react-native-async-storage/async-storage';
import { wait } from './helpers';
const ASYNCSTORAGE_KEY = 'Reactnd-Project3-24';
import { defaultDecks } from './default';

export function getDecks() {
    return new Promise(async function executor(resolve, reject) {
        let data = {};
        await wait(500);
        const asyncStorageValue = await AsyncStorage.getItem(ASYNCSTORAGE_KEY);
        if (asyncStorageValue !== null) {
            data = JSON.parse(asyncStorageValue);
            for (let item in data) {
                data[item].id = item
            }
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

export function addCard(deckId, card) {
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