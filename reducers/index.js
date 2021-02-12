import { RECEIVE_DECKS, ADD_CARD, SET_LOADING } from '../actions';
import { combineReducers } from 'redux'

function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {...action.decks};
        case ADD_CARD:
            let newState = {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                }
            }
            return newState;
        default:
            return state;
    }
}

function loadingIndicator(state = false, action) {
    switch(action.type) {
        case SET_LOADING:
            return action.loadingIndicator;
        default:
            return state;
    }
}

export default combineReducers({
    decks,
    loadingIndicator
})