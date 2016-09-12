import {
    SET_NEXT_VALUE
} from '../constants/Keyboard'

const initialState = {
    list: [],
    modalOpen: false
};

export default function Keyboard(state = initialState, action) {
    switch (action.type) {
        case SET_NEXT_VALUE:
            // console.log(action.payload)
            return { ...state };
        default:
            return state;
    }
}