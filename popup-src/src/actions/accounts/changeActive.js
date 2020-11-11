import store from 'Root/store';
import types from 'Root/actions';
import * as route from 'Root/staticRes/routes';

import storeAccount from './store';

export default async (publicKey) => {
  store.dispatch({
    publicKey: publicKey,
    type: types.accounts.CHANGE_ACTIVE,
  });

  await storeAccount();
}
