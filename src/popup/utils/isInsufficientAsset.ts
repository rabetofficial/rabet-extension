import { Horizon } from 'stellar-sdk';

import BN from 'helpers/BN';

const isInsufficientAsset = (
  asset: Horizon.BalanceLine,
  maxXLM: number,
  amount: string,
) => {
  const sAmount = new BN(amount);
  const balance = new BN(asset.balance);

  if (asset.asset_type === 'liquidity_pool_shares') {
    return false;
  }

  const SL = new BN(asset.selling_liabilities);

  let subentries;

  if (asset.asset_type === 'native') {
    subentries = SL.plus(maxXLM);
  } else {
    subentries = SL;
  }

  if (balance.isLessThanOrEqualTo(0)) {
    return false;
  }

  if (sAmount.plus(subentries).isGreaterThan(balance)) {
    return false;
  }

  return true;
};

export default isInsufficientAsset;
