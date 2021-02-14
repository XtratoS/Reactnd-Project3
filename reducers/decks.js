import { ADD_CARD, CREATE_DECK, REMOVE_DECK } from "../actions/decks";
import { RECEIVE_INITIAL_DATA } from "../actions/shared";

export default function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_INITIAL_DATA:
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