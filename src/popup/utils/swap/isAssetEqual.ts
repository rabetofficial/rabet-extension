import { Horizon } from '@stellar/stellar-sdk';

import matchAsset from '../matchAsset';

const isAssetEqual = (
  asset1: Horizon.HorizonApi.BalanceLine,
  asset2: Horizon.HorizonApi.BalanceLine,
) => {
  if (
    asset1.asset_type === 'native' &&
    asset2.asset_type === 'native'
  ) {
    return true;
  }

  return matchAsset(asset1, asset2);
};

export default isAssetEqual;
