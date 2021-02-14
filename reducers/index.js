import { combineReducers } from 'redux';
import decks from './decks';
import loadingIndicator from './loadingIndicator';
import dailyReminderTime from './dailyReminderTime';

export default combineReducers({
    decks,
    loadingIndicator,
    dailyReminderTime
});