import * as Types from './actionTypes';

const setNewBoard = (payload) => ({
    type: Types.NEW_BOARD,
    payload
})

const setBoardCollection = (payload) => ({
    type: Types.COLLECTION_BOARD,
    payload
})

const removeBoard = (payload) => ({
    type: Types.REMOVE_BOARD,
    payload
})

const activeBoard = (payload) => ({
    type: Types.ACTIVE_BOARD,
    payload
})

const updateBoard = (payload) => ({
    type: Types.UPDATE_BOARD,
    payload
})

export function newBoard(data) {
    return (dispatch) => {
        dispatch(setNewBoard(data));
    }
}

export function boardCollection(data) {
    return (dispatch) => {
        dispatch(setBoardCollection(data));
    }
}

export function removeBoardCollection(data) {
    return (dispatch) => {
        dispatch(removeBoard(data));
    }
}

export function activeBoardCollection(data) {
    return (dispatch) => {
        dispatch(activeBoard(data));
    }
}

export function updateBoardCollection(data) {
    return (dispatch) => {
        dispatch(updateBoard(data));
    }
}