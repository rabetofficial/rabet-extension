import RouteName from 'popup/staticRes/routes';
import updateBalances from 'popup/utils/updateBalances';
import changeNetworkEvent from 'popup/events/changeNetwork';
import currentActiveAccount from 'popup/utils/activeAccount';
import { changeNetwork } from 'popup/reducers/options';

import storeOptions from './store';
import getData from '../accounts/getData';

export default async (network, push) => {
  push(RouteName.LoadingOne);

  changeNetwork(network.value);
  changeNetworkEvent(network.value);

  const { activeAccount } = currentActiveAccount();

  if (activeAccount) {
    await updateBalances();

    await getData(activeAccount.publicKey);

    await storeOptions();

    push(RouteName.Home);
  } else {
    push(RouteName.First);
  }
};
