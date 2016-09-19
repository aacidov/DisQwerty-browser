import {
    SET_NEXT_VALUE,
    ADD_LETTER,
    REMOVE_LAST_LETTER,
    REMOVE_ALL,
    REMOVE_LAST_WORD,
    SET_LETTERS
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

export function removeLastLetter() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_LAST_LETTER,
            payload: null
        });
    }
}

export function removeAll() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_ALL,
            payload: null
        });
    }
}

export function removeLastWord() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_LAST_WORD,
            payload: null
        });
    }
}

export function setLetters(letters) {
    return (dispatch) => {
        dispatch({
            type: SET_LETTERS,
            payload: letters
        });
    }
}