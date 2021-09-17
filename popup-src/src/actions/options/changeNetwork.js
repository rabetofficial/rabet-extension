import types from '../index';
import store from '../../store';
import storeOptions from './store';
import getData from '../accounts/getData';
import * as route from '../../staticRes/routes';
import updateBalances from '../../helpers/updateBalances';
import changeNetworkEvent from '../../events/changeNetwork';
import currentActiveAccount from '../../helpers/activeAccount';

export default async (network, push) => {
  push(route.loadingOnePage);

  store.dispatch({
    type: types.options.CHANGE_NETWORK,
    network: network.value,
  });

  changeNetworkEvent(network.value);

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
