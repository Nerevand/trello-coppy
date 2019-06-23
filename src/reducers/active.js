import * as Types from '../actions/actionTypes';

const initialState = {}

export default function ActiveBoard(state = initialState, { type, payload }) {
    if (type === Types.ACTIVE_BOARD) {
        return payload
    }
    return state;
}