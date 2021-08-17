import types from '../index';
import store from '../../store';
import * as route from '../../staticRes/routes';
import updateBalances from '../../helpers/updateBalances';
import currentActiveAccount from '../../helpers/activeAccount';

import storeOptions from './store';
import getData from '../accounts/getData';

export default async (network, push) => {
  push(route.loadingOnePage);

  store.dispatch({
    type: types.options.CHANGE_NETWORK,
    network: network.value,
  });

  const { activeAccount } = currentActiveAccount();

  if (activeAccount) {
    await updateBalances();

    await getData(activeAccount.publicKey);

    await storeOptions();

    push(route.homePage);
  } else {
    push(route.firstPage);
  }
};
