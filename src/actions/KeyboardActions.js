import {
    SET_NEXT_VALUE
} from '../constants/Keyboard'

export function setNextStep(r, k) {
    return (dispatch) => {
        dispatch({
            type: SET_NEXT_VALUE,
            payload: {r, k}
        });
    }
}