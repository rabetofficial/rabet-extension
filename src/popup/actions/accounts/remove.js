import types from '../index';
import store from '../../store';
import storeAccount from './store';
import changeActive from './changeActive';
import * as route from '../../staticRes/routes';
import removeAllConnectedWebsites from './removeAllConnectedWebsites';

const removeAccount = async (publicKey, push) => {
  store.dispatch({
    type: types.accounts.REMOVE,
    publicKey,
  });

  removeAllConnectedWebsites(publicKey);

  const { accounts } = store.getState();

  if (accounts.length) {
    changeActive(accounts[0].publicKey);

    push(route.homePage);
  } else {
    push(route.firstPage);

    await storeAccount();
  }
};

export default removeAccount;
