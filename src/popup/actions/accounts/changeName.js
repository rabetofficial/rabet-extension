import types from '../index';
import store from '../../store';
import currentActiveAccount from '../../utils/activeAccount';

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
