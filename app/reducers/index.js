// @flow

import { combineReducers } from 'redux';
import navigator from './navigator';
import account from './account';
import modal from './modal';
import settings from './settings';

export default combineReducers({
    navigator,
    account,
    modal,
    settings,
});
