import { Horizon } from '@stellar/stellar-sdk';

const nativeAsset = (
  asset: Horizon.HorizonApi.BalanceLine,
): boolean => asset.asset_type === 'native';

export default nativeAsset;
