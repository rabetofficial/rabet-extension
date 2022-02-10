import { Balance } from '../reducers/accounts';

const matchAsset = (asset1: Balance, asset2: Balance): boolean =>
  asset1.asset_code === asset2.asset_code &&
  asset1.asset_issuer === asset2.asset_issuer;

export default matchAsset;
