import store from 'Root/store';
import types from 'Root/actions';
import * as route from 'Root/staticRes/routes';
import currentActiveAccount from 'Root/helpers/activeAccount';

import storeOptions from './store';
import getData from '../accounts/getData';

export default async (network, push) => {
  const { activeAccount } = currentActiveAccount();

  push(route.loadingOnePage);

  store.dispatch({
    type: types.options.CHANGE_NETWORK,
    network: network.value,
  });

  await getData(activeAccount.publicKey);

  await storeOptions();

  push(route.homePage);
};
