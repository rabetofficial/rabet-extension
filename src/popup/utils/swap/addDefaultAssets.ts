import { Horizon } from 'stellar-sdk';

import matchAsset from '../matchAsset';
import { AssetType } from '../../staticRes/defaultAssets/types';

const addDefaultAssets = (
  assets: Horizon.BalanceLine[],
  defaultAssets: AssetType[],
): any[] => {
  let newAssets = [...defaultAssets, ...assets];

  for (let i = 0; i < defaultAssets.length; i += 1) {
    const foundAsset = assets.find((asset) =>
      matchAsset(asset, defaultAssets[i]),
    );

    if (foundAsset) {
      const foundAssetIndex = newAssets.findIndex((asset) =>
        matchAsset(asset, defaultAssets[i]),
      );

      newAssets = newAssets.filter(
        (asset) => !matchAsset(asset, foundAsset),
      );

      newAssets = [
        ...newAssets.slice(0, foundAssetIndex),
        foundAsset,
        ...newAssets.slice(foundAssetIndex + 1),
      ];
    }
  }

  return newAssets;
};

export default addDefaultAssets;
