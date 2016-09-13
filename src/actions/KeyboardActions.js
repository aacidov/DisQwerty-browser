import {
    SET_NEXT_VALUE,
    ADD_LETTER
} from '../constants/Keyboard'

export function setNextRow(r, c) {
    return (dispatch) => {
        dispatch({
            type: SET_NEXT_VALUE,
            payload: {r, c}
        });
    }
}

export function addLetter(l) {
    return (dispatch) => {
        dispatch({
            type: ADD_LETTER,
            payload: l
        });
    }
}