import store from 'popup/store';
import { change, OptionMode } from 'popup/reducers/options';

import storeOptions from './store';

type ChangeOptionsType = {
  explorer: string;
  currency: string;
  mode: OptionMode;
  privacyMode: boolean;
  autoTimeLocker: number;
};

const changeOptions = async (options: ChangeOptionsType) => {
  const { mode, currency, explorer, privacyMode, autoTimeLocker } =
    options;

  store.dispatch(
    change({
      explorer,
      privacyMode,
      autoTimeLocker,
      currency,
      mode,
    }),
  );

  await storeOptions();

  return true;
};

export default changeOptions;
