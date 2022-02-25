import store from 'popup/store';
import changeNetworkEvent from 'popup/events/changeNetwork';
import { changeNetwork, Network } from 'popup/reducers/options';

import storeOptions from './store';

export default async (network: Network) => {
  store.dispatch(changeNetwork(network));
  changeNetworkEvent(network);

  await storeOptions();
};
