import {
    SET_VALUE
} from '../constants/Keyboard'

const initialState = {
    list: [],
    modalOpen: false
};

export default function Keyboard(state = initialState, action) {
    switch (action.type) {
        case SET_VALUE:
            return { ...state };
        default:
            return state;
    }
}