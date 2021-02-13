import {
    getDecks,
    addCard as _addCard,
    createDeck as _createDeck,
    removeDeck as _removeDeck,
} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD';
export const SET_LOADING = 'SET_LOADING';
export const CREATE_DECK = 'CREATE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';

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