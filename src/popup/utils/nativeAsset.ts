import { Balance } from '../reducers/accounts';

const nativeAsset = (asset: Balance): boolean =>
  asset.asset_type === 'native';

export default nativeAsset;
