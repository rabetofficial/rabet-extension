import store from 'popup/store';
import RouteName from 'popup/staticRes/routes';
import { remove } from 'popup/reducers/accounts';

import storeAccount from './store';
import changeActive from './changeActive';
import removeAllConnectedWebsites from './removeAllConnectedWebsites';

const removeAccount = async (publicKey: string, navigate) => {
  store.dispatch(remove(publicKey));
  removeAllConnectedWebsites(publicKey);

  const { accounts } = store.getState();

  if (accounts.length) {
    changeActive(accounts[0].publicKey);

    navigate(RouteName.Home);
  } else {
    navigate(RouteName.First);

    await storeAccount();
  }
};

export default removeAccount;
