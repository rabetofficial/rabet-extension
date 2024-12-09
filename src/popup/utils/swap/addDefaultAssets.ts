import { Horizon } from '@stellar/stellar-sdk';

import matchAsset from '../matchAsset';

const addDefaultAssets = (
  assets: Horizon.HorizonApi.BalanceLine[],
  defaultAssets: Horizon.HorizonApi.BalanceLineAsset<'credit_alphanum4'>[],
): Horizon.HorizonApi.BalanceLine[] => {
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
