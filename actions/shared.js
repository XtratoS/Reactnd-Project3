import {
    getDecks,
} from '../utils/api';

import { setLoading } from './loadingIndicator';

export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';

function receiveInitialData(decks) {
    return {
        type: RECEIVE_INITIAL_DATA,
        decks
    }
}

export function handleInitialData() {
    return async function(dispatch) {
        dispatch(setLoading(true));

        let decks = await getDecks();

        dispatch(receiveInitialData(decks));
        dispatch(setLoading(false));
    }
}