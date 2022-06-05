import { AssetLike } from 'popup/models';

type JSONAsset = {
  asset_code: string;
  asset_issuer: string;
};

const getJSONAssets = <T extends AssetLike>(
  assets: T[],
): JSONAsset[] => {
  const newAssets: JSONAsset[] = [];

  for (let i = 0; i < assets.length; i += 1) {
    const asset = assets[i];

    newAssets.push({
      asset_code: asset.asset_code,
      asset_issuer: asset.asset_issuer,
    });
  }

  return newAssets;
};

export default getJSONAssets;
