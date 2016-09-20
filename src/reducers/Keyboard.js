import {
    SET_NEXT_VALUE,
    ADD_LETTER,
    REMOVE_LAST_LETTER,
    REMOVE_LAST_WORD,
    REMOVE_ALL,
    SET_LETTERS,
    PREDICT_SHOW
} from '../constants/Keyboard'

const initialState = {
    row: 0,
    cell: -1,
    phrase: '',
    predict: [],
    letters: []
};

export default function Keyboard(state = initialState, action) {
    switch (action.type) {
        case SET_LETTERS:
            return { ...state, letters: action.payload};
        case SET_NEXT_VALUE:
            return { ...state, row: action.payload.r, cell: action.payload.c};
        case ADD_LETTER:
            let phrase = state.phrase + action.payload;
            return { ...state, phrase: phrase};
        case REMOVE_LAST_LETTER:
            return { ...state, phrase: state.phrase.substring(0, state.phrase.length - 1)};
        case REMOVE_LAST_WORD:
            let words = state.phrase.split(' ');
            words = words.slice(0,-1);
            return { ...state, phrase: words.join(' ') + ' '};
        case REMOVE_ALL:
            return { ...state, phrase: ''};
        case PREDICT_SHOW:
            return { ...state, predict: action.payload};
        default:
            return state;
    }
}