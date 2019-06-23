import React from 'react';
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import App from './pages/App';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';

import './index.css';

const logger = store => next => action => {
    // console.info('dispatching: ', action);
    let result = next(action);
    // console.log('next state: ', store.getState());
    return result;
};

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, logger)));
window.store = store;

store.subscribe(() => {
    localStorage.setItem('store', JSON.stringify(store.getState()));
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();
