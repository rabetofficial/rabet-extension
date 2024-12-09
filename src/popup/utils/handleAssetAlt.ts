import { Horizon } from '@stellar/stellar-sdk';

const handleAssetAlt = (asset: Horizon.HorizonApi.BalanceLine) => {
  if (asset.asset_type === 'native') {
    return 'X';
  }

  if (asset.asset_type === 'liquidity_pool_shares') {
    return 'L';
  }

  return asset.asset_code[0];
};

export default handleAssetAlt;
