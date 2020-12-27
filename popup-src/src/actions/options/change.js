import store from 'Root/store';
import types from 'Root/actions';
import * as route from 'Root/staticRes/routes';

import storeOptions from './store';

export default async (options, push) => {
  const explorer = options.explorer.value;
  const privacyMode = options.privacyMode;
  const autoTimeLocker = options.autoTimeLocker.value;

  store.dispatch({
    type: types.options.CHANGE,
    options: {
      explorer,
      privacyMode,
      autoTimeLocker,
    },
  });

  await storeOptions();

  push({
    pathname: route.homePage,
    state: {
      alreadyLoaded: true,
    }
  });
};
