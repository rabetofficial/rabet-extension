import store from '../../store';
import types from '../index';
import * as route from '../../staticRes/routes';

import storeOptions from './store';

export default async (options, push) => {
  const explorer = options.explorer.value;
  const { privacyMode } = options;
  const autoTimeLocker = options.autoTimeLocker.value;
  const currency = options.currency.value;

  store.dispatch({
    type: types.options.CHANGE,
    options: {
      explorer,
      privacyMode,
      autoTimeLocker,
      currency,
    },
  });

  await storeOptions();

  push(
    route.homePage,
    {
      alreadyLoaded: true,
    },
  );
};
