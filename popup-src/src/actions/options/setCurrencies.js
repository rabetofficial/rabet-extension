import types from '../index';
import store from '../../store';
import toCurrencies from '../../helpers/horizon/toCurrencies';

export default async () => {
  const currencies = await toCurrencies();

  store.dispatch({
    type: types.currencies.LOAD,
    payload: currencies,
  });
};
