import store from '../store';

import * as accountModel from './account';
import * as accountActions from '../actions/account';

export default async function () {
  const account = await accountModel.get();

  store.dispatch(accountActions.defaultSet(account));
}
