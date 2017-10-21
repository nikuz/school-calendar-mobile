// @flow

import store from '../store';

import * as accountModel from './account';
import {
    accountActions,
    settingsActions,
} from '../actions';

export default async function() {
    const account = await accountModel.get();

    store.dispatch(accountActions.defaultSet(account));
    store.dispatch(settingsActions.defaultSet({}));
}
