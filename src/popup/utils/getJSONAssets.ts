import { Horizon } from 'stellar-sdk';

type JSONAsset = {
  asset_code: string;
  asset_issuer: string;
};

const getJSONAssets = (
  assets: Horizon.BalanceLine[],
): JSONAsset[] => {
  const newAssets: JSONAsset[] = [];

  for (let i = 0; i < assets.length; i += 1) {
    const asset = assets[i];

    if (
      asset.asset_type === 'credit_alphanum4' ||
      asset.asset_type === 'credit_alphanum12'
    ) {
      newAssets.push({
        asset_code: asset.asset_code,
        asset_issuer: asset.asset_issuer,
      });
    }
  }

  return newAssets;
};

export default getJSONAssets;
