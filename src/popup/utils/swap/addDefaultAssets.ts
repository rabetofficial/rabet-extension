import { Horizon } from 'stellar-sdk';

import matchAsset from '../matchAsset';

const addDefaultAssets = (
  assets: Horizon.BalanceLine[],
  defaultAssets: Horizon.BalanceLineAsset<'credit_alphanum4'>[],
): Horizon.BalanceLine[] => {
  const newAssets = [...assets];

  for (let i = 0; i < defaultAssets.length; i += 1) {
    const foundAsset = assets.find((asset) =>
      matchAsset(asset, defaultAssets[i]),
    );

    if (!foundAsset) {
      newAssets.push(defaultAssets[i]);
    }
  }

  return newAssets;
};

export default addDefaultAssets;
