// @flow

import { combineReducers } from 'redux';
import navigator from './navigator';
import account from './account';
import modal from './modal';

export default combineReducers({
    navigator,
    account,
    modal,
});
