import {
    SET_NEXT_VALUE
} from '../constants/Keyboard'

const initialState = {
    row: 0,
    cell: -1
};

export default function Keyboard(state = initialState, action) {
    switch (action.type) {
        case SET_NEXT_VALUE:
            // console.log(action.payload)
            return { ...state, row: action.payload.r, cell: action.payload.c};
        default:
            return state;
    }
}