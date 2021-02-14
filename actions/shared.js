import * as Notifications from 'expo-notifications';

import {
    getDecks,
    getLocalNotification,
} from '../utils/api';

import { setLoading } from './loadingIndicator';

export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';

function receiveInitialData(decks, time) {
    return {
        type: RECEIVE_INITIAL_DATA,
        decks,
        time
    }
}

export function handleInitialData() {
    return async function(dispatch) {
        dispatch(setLoading(true));

        let decks = getDecks();

        const localNotif = await getLocalNotification();
        let nextTimeStamp;
        if (localNotif && (localNotif !== null)) {
            const { hour, minute } = localNotif.trigger;
            const _trigger = { repeats: true, hour, minute };
            nextTimeStamp = Notifications.getNextTriggerDateAsync(_trigger);
        } else {
            nextTimeStamp = null;
        }

        decks = await decks;
        nextTimeStamp = nextTimeStamp === null ? nextTimeStamp : (await nextTimeStamp);

        dispatch(receiveInitialData(decks, nextTimeStamp));
        dispatch(setLoading(false));
    }
}