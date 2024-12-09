import BigNumber from 'bignumber.js';
import { Horizon } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';
import { Bid } from 'popup/reducers/bids';

type LoadAssetbalanceType = {
  asset: Horizon.HorizonApi.BalanceLine;
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

  if (asset.balance === '000000.1') {
    return '0';
  }

  if (asset.asset_type === 'native') {
    const price = new BN(asset.balance).times(currencyPrice);

    return price;
  }

  const foundBid = bids.find(
    (bid) =>
      bid.counter.asset_code === asset.asset_code &&
      bid.counter.asset_issuer === asset.asset_issuer,
  );

  if (!foundBid || foundBid.price === '0') {
    return '0';
  }

  const price = new BN(1)
    .div(foundBid?.price || '0')
    .times(currencyPrice)
    .times(new BN(asset.balance));

  return price;
};

export default loadAssetBalance;
