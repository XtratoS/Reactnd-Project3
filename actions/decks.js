import {
    addCard as _addCard,
    createDeck as _createDeck,
    removeDeck as _removeDeck,
} from '../utils/api';

import { setLoading } from './loadingIndicator';

export const ADD_CARD = 'ADD_CARD';
export const CREATE_DECK = 'CREATE_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';



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