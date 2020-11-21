import store from 'Root/store';
import types from 'Root/actions';
import toUsdPrice from 'Root/helpers/horizon/toUsdPrice';

export default async () => {
  const usdPrice = await toUsdPrice();

  store.dispatch({
    type: types.options.SET_USD,
    price: usdPrice,
  });
};
