import { combineReducers } from "redux";

import newBoard from './newBoard';
import boardCollection from './boardCollection';
import activeBoard from './active';

export default combineReducers({
    newBoard,
    boardCollection,
    activeBoard
});
