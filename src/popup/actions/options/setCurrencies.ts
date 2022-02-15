import store from 'popup/store';
import toCurrencies from '../../utils/horizon/getCurrencies';
import { load } from '../../reducers/currencies';

export default async (): Promise<void> => {
  const currencies = await toCurrencies();

  store.dispatch(load(currencies));
};
