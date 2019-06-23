import * as Types from '../actions/actionTypes';

export default function newBoard(state = {}, { type, payload }) {
    if (type === Types.NEW_BOARD) {
        return payload;
    }
    return state;
}