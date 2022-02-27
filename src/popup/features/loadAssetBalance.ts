import { Horizon } from 'stellar-sdk';
import BigNumber from 'bignumber.js';

import BN from 'helpers/BN';
import { Bid } from 'popup/reducers/bids';

type LoadAssetbalanceType = {
  asset: Horizon.BalanceLine;
  currencyPrice: BigNumber;
  bids: Bid[];
};

const loadAssetBalance = ({
  asset,
  currencyPrice,
  bids,
}: LoadAssetbalanceType) => {
  if (asset.asset_type === 'liquidity_pool_shares') {
    return '0';
  }

  if (asset.asset_type === 'native') {
    const price = new BN(asset.balance).times(currencyPrice);

    return price.toFixed(6).toString();
  }

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

export default loadAssetBalance;
