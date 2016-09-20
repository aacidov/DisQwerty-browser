import {
    SET_NEXT_VALUE,
    ADD_LETTER,
    REMOVE_LAST_LETTER,
    REMOVE_ALL,
    REMOVE_LAST_WORD,
    SET_LETTERS,
    PREDICT_LOAD,
    PREDICT_SHOW,
    PREDICT_KEY
} from '../constants/Keyboard'

import axios from 'axios'

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

export function addPredict(word) {
    return (dispatch) => {
        dispatch({
            type: REMOVE_LAST_WORD,
            payload: null
        });

        dispatch({
            type: ADD_LETTER,
            payload: ' ' + word + ' '
        });
    }
}

export function predict(lang) {
    return (dispatch, getState) => {
        let {phrase} = getState().Keyboard;

        phrase = phrase.split(' ').filter(w => w !== '' && w !== ' ');
        phrase = phrase.pop();
        if(phrase.trim() !== '')
        {
            dispatch({
                type: PREDICT_LOAD,
                payload: true
            });

            axios
                .get('https://predictor.yandex.net/api/v1/predict.json/complete?key=' + PREDICT_KEY + '&q=' + phrase + '&lang=' + lang + '&limit=3')
                .then(data => {
                    dispatch({
                        type: PREDICT_SHOW,
                        payload: data.data.text
                    });
                }).catch(error => console.error(error))
            ;
        }
    }
}
