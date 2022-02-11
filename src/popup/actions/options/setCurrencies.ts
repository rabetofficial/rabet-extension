import store from 'popup/store';
import toCurrencies from '../../utils/horizon/toCurrencies';
import { load } from '../../reducers/currencies';

export default async (): Promise<void> => {
  const currencies = await toCurrencies();

  store.dispatch(load(currencies));
};
