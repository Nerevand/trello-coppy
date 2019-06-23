import * as Types from '../actions/actionTypes';

const initialState = []

export default function BoardCollection(state = initialState, { type, payload }) {

    if (type === Types.COLLECTION_BOARD) {
        return [...state, payload];
    } else if (type === Types.REMOVE_BOARD) {
        return state.filter(item => item.id !== payload);
    } else if (type === Types.UPDATE_BOARD) {
        return payload;
    }
    return state;
}