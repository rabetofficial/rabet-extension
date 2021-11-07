import types from '../index';
import store from '../../store';
import toCurrencies from '../../utils/horizon/toCurrencies';

export default async () => {
  const currencies = await toCurrencies();

  store.dispatch({
    type: types.currencies.LOAD,
    payload: currencies,
  });
};
