import store from 'Root/store';
import types from 'Root/actions';
import * as route from 'Root/staticRes/routes';

import storeOptions from './store';

export default async (options, push) => {
  const network = options.network.value;
  const privacyMode = options.privacyMode;
  const autoTimeLocker = options.autoTimeLocker.value;

  store.dispatch({
    type: types.options.CHANGE,
    options: {
      network,
      privacyMode,
      autoTimeLocker,
    },
  });

  await storeOptions();

  push(route.homePage);
};
