import {
    SET_NEXT_VALUE
} from '../constants/Keyboard'

export function setNextRow(r, c) {
    return (dispatch) => {
        dispatch({
            type: SET_NEXT_VALUE,
            payload: {r, c}
        });
    }
}