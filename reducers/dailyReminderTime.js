import { SET_TIME } from "../actions/dailyReminderTime";
import { RECEIVE_INITIAL_DATA } from "../actions/shared";

export default function dailyReminderTime(state = null, action) {
    switch(action.type) {
        case RECEIVE_INITIAL_DATA:
            return action.time;
        case SET_TIME:
            return action.time;
        default:
            return state;
    }
}