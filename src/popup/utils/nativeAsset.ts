import { Horizon } from 'stellar-sdk';

const nativeAsset = (asset: Horizon.BalanceLine): boolean =>
  asset.asset_type === 'native';

export default nativeAsset;
