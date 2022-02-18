import store from 'popup/store';
import { load } from 'popup/reducers/currencies';
import getCurrencies from 'popup/api/getCurrencies';

const loadCurrencies = async () => {
  const currencies = await getCurrencies();

  store.dispatch(load(currencies));
};

export default loadCurrencies;
