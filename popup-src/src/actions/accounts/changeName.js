import store from 'Root/store';
import types from 'Root/actions';
import currentActiveAccount from 'Root/helpers/activeAccount';

import storeAccount from './store';

export default (name) => {
  const { activeAccount } = currentActiveAccount();

  store.dispatch({
    name,
    type: types.accounts.CHANGE_NAME,
    publicKey: activeAccount.publicKey,
  });

  storeAccount();
};
