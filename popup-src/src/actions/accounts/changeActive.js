import store from 'Root/store';
import types from 'Root/actions';

import interval from './interval';
import storeAccount from './store';

export default async (publicKey) => {
  store.dispatch({
    publicKey: publicKey,
    type: types.accounts.CHANGE_ACTIVE,
  });

  interval(publicKey);

  await storeAccount();

  return true;
}
