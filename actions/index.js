import * as Notifications from 'expo-notifications';
import {
    getDecks,
    addCard as _addCard,
    createDeck as _createDeck,
    removeDeck as _removeDeck,
    getLocalNotification,
    setLocalNotification,
} from '../utils/api';

export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const SET_LOADING = 'SET_LOADING';
export const CREATE_DECK = 'CREATE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const SET_TIME = 'SET_TIME';

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
        // dispatch(receiveDecks(decks));
        // dispatch(setTime(nextTimeStamp));
        dispatch(setLoading(false));
    }
}

function addCard({ deckId, card }) {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}

export function handleAddCard(cardData) {
    return function(dispatch) {
        dispatch(setLoading(true));
        _addCard(cardData).then(() => {
            dispatch(addCard(cardData));
            dispatch(setLoading(false));
        });
    }
}

function createDeck(title) {
    return {
        type: CREATE_DECK,
        deck: {title, questions: []}
    }
}

export function handleCreateDeck(title) {
    return function(dispatch) {
        dispatch(setLoading(true));
        _createDeck(title).then((newDeckCreated) => {
            if (newDeckCreated === true) {
                dispatch(createDeck(title));
            }
            dispatch(setLoading(false));
        });
    }
}

function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title
    }
}

export function handleRemoveDeck(title) {
    return function(dispatch) {
        dispatch(setLoading(true));
        _removeDeck(title).then(()=> {
            dispatch(removeDeck(title));
            dispatch(setLoading(false));
        });
    }
}

export function setLoading(loadingIndicator) {
    return {
        type: SET_LOADING,
        loadingIndicator
    }
}

function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}

export function handleSetTime(time) {
    return function(dispatch) {
        dispatch(setLoading(true));
        setLocalNotification(time).then(() => {
            dispatch(setTime(time));
            dispatch(setLoading(false));
        });
    }
}