import { getDecks, addCard as _addCard } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const SET_LOADING = 'SET_LOADING';

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleReceiveDecks() {
    return function(dispatch) {
        dispatch(setLoading(true));
        getDecks().then((decks) => {
            dispatch(receiveDecks(decks));
            dispatch(setLoading(false));
        });
    }
}

function addCard({ deckId, card }) {
    return {
        type: ADD_CARD,
        deckId,
        card
    }
}

export function handleAddCard({ deckId, card }) {
    return function(dispatch) {
        dispatch(setLoading(true));
        _addCard(deckId, card).then((addedCard) => {
            dispatch(addCard({ deckId, addedCard }));
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