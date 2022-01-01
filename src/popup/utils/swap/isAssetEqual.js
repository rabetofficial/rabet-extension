import isNative from '../isNative'
import matchAsset from '../matchAsset';

const isAssetEqual = (asset1, asset2) => {
  if (isNative(asset1) && isNative(asset2)) {
    return true;
  }

  return matchAsset(asset1, asset2);
};

export default isAssetEqual;
