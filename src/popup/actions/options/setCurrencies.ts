import store from 'popup/store';
import { load } from 'popup/reducers/currencies';
import toCurrencies from 'popup/api/getCurrencies';

export default async (): Promise<void> => {
  const currencies = await toCurrencies();

  store.dispatch(load(currencies));
};
