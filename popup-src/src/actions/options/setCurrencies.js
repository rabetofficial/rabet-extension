import store from 'Root/store';
import types from 'Root/actions';
import toCurrencies from 'Root/helpers/horizon/toCurrencies';

export default async () => {
  const currencies = await toCurrencies();

  store.dispatch({
    type: types.currencies.LOAD,
    payload: currencies,
  });
};
