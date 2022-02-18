import { Horizon } from 'stellar-sdk';

import BN from 'helpers/BN';
import { Bid } from 'popup/reducers/bids';
import { IOption } from 'popup/reducers/options';
import { Currencies } from 'popup/reducers/currencies';

const handleAssetPrice = (
  asset: Horizon.BalanceLine,
  currencies: Currencies,
  options: IOption,
  bids: Bid[],
) => {
  const currency = options.currency || 'USD';
  const activeCurrency = currencies[currency] || {
    title: 'USD',
    price: 0,
  };

  const currencyPrice = new BN(activeCurrency.price);

  if (asset.asset_type === 'liquidity_pool_shares') {
    return '0';
  }

  if (asset.asset_type === 'native') {
    const price = new BN(asset.balance).times(currencyPrice);

    return price.toFixed(6).toString();
  }

  /*
   (1 / Number.parseFloat(item.toNative, 10))
        * activeCurrency.value * Number.parseFloat(item.balance, 10);
  */

  const foundBid = bids.find(
    (bid) =>
      bid.counter.asset_code === asset.asset_code &&
      bid.counter.asset_issuer === asset.asset_issuer,
  );

  if (!foundBid) {
    return '0';
  }

  const price = new BN(1)
    .div(foundBid.price)
    .times(currencyPrice)
    .times(new BN(asset.balance));

  return price.toFixed(6).toString();
};

export default handleAssetPrice;
