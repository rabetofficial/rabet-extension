import { Horizon } from '@stellar/stellar-sdk';

const handleAssetsKeys = (asset: Horizon.HorizonApi.BalanceLine) => {
  if (asset.asset_type === 'native') {
    return asset.asset_type;
  }

  if (asset.asset_type === 'liquidity_pool_shares') {
    return asset.liquidity_pool_id;
  }

  return asset.asset_code + asset.asset_issuer;
};

export default handleAssetsKeys;
