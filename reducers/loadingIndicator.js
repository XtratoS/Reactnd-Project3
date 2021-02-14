import { SET_LOADING } from "../actions/loadingIndicator";

export default function loadingIndicator(state = false, action) {
    switch(action.type) {
        case SET_LOADING:
            return action.loadingIndicator;
        default:
            return state;
    }
}