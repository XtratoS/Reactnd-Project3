import { setLocalNotification } from '../utils/api';
import { setLoading } from './loadingIndicator';

export const SET_TIME = 'SET_TIME';

function setTime(time) {
    return {
        type: SET_TIME,
        time
    }
}

export function handleSetTime(time) {
    return function(dispatch) {
        dispatch(setLoading(true));
        setLocalNotification(time).then(() => {
            dispatch(setTime(time));
            dispatch(setLoading(false));
        });
    }
}