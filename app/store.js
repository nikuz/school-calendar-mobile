// @flow

import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const middlewares = [
    thunkMiddleware,
];

if (__DEV__) { // eslint-disable-line no-undef
    const reduxLogger = require('redux-logger'); // eslint-disable-line global-require
    middlewares.push(reduxLogger.createLogger());
}

const middleware = applyMiddleware(...middlewares);

export default createStore(
    reducers,
    compose(middleware)
);
