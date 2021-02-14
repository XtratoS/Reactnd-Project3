import { RECEIVE_DECKS, ADD_CARD, SET_LOADING, CREATE_DECK, REMOVE_DECK, SET_TIME, RECEIVE_INITIAL_DATA } from '../actions';
import { combineReducers } from 'redux'

function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_INITIAL_DATA:
            return {...action.decks};
        case RECEIVE_DECKS:
            return {...action.decks};
        case CREATE_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck
            }
        case REMOVE_DECK:
            delete state[action.title];
            return state;
        case ADD_CARD:
            let newState = {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: state[action.deckId].questions.concat([action.card])
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

function dailyReminderTime(state = null, action) {
    switch(action.type) {
        case RECEIVE_INITIAL_DATA:
            return action.time;
        case SET_TIME:
            return action.time;
        default:
            return state;
    }
}

export default combineReducers({
    decks,
    loadingIndicator,
    dailyReminderTime
})