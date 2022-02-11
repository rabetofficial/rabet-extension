import RouteName from 'popup/staticRes/routes';
import { change } from 'popup/reducers/options';

import storeOptions from './store';

export default async (options, push) => {
  const { privacyMode } = options;
  const explorer = options.explorer.value;
  const autoTimeLocker = options.autoTimeLocker.value;
  const currency = options.currency.value;
  const mode = options.mode.value;

  change({
    explorer,
    privacyMode,
    autoTimeLocker,
    currency,
    mode,
  });

  await storeOptions();

  push(RouteName.Home, {
    state: {
      alreadyLoaded: true,
    },
  });
};
