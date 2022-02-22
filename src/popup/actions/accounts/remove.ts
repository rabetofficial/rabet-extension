import store from 'popup/store';
import { remove } from 'popup/reducers/accounts2';

import storeAccount from './store';
import changeActive from './changeActive';
import removeAllConnectedWebsites from './removeAllConnectedWebsites';

const removeAccount = async (publicKey: string) => {
  store.dispatch(remove(publicKey));

  removeAllConnectedWebsites(publicKey);

  const { accounts } = store.getState();

  if (accounts.length) {
    changeActive(accounts[0].publicKey);
  } else {
    await storeAccount();
  }

  return true;
};

export default removeAccount;
