import store from 'Root/store';
import types from 'Root/actions';
import * as route from 'Root/staticRes/routes';

import storeOptions from './store';

export default async (network) => {
  store.dispatch({
    type: types.options.CHANGE_NETWORK,
    network: network.value,
  });

  await storeOptions();
};
