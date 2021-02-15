import { combineReducers } from 'redux';
import decks from './decks';
import loadingIndicator from './loadingIndicator';

export default combineReducers({
    decks,
    loadingIndicator,
});