import {
    SET_NEXT_VALUE,
    ADD_LETTER
} from '../constants/Keyboard'

const initialState = {
    row: 0,
    cell: -1,
    phrase: '',
    predict: []
};

export default function Keyboard(state = initialState, action) {
    switch (action.type) {
        case SET_NEXT_VALUE:
            return { ...state, row: action.payload.r, cell: action.payload.c};
        case ADD_LETTER:
            let phrase = state.phrase + action.payload;
            return { ...state, phrase: phrase};
        default:
            return state;
    }
}