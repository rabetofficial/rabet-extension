import { Horizon } from 'stellar-sdk';

const matchAsset = (
  asset1: Horizon.BalanceLine,
  asset2: Horizon.BalanceLine,
): boolean => {
  if (
    asset1.asset_type === 'native' &&
    asset2.asset_type === 'native'
  ) {
    return true;
  }

  if (
    asset1.asset_type === 'liquidity_pool_shares' &&
    asset2.asset_type === 'liquidity_pool_shares'
  ) {
    return true;
  }

  if (
    (asset1.asset_type === 'credit_alphanum4' ||
      asset1.asset_type === 'credit_alphanum12') &&
    (asset2.asset_type === 'credit_alphanum4' ||
      asset2.asset_type === 'credit_alphanum12')
  ) {
    return (
      asset1.asset_code === asset2.asset_code &&
      asset1.asset_issuer === asset2.asset_issuer
    );
  }

  return false;
};

export default matchAsset;
