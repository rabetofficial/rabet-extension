import { AssetLike } from 'popup/models';
import getJSONAssets from 'popup/utils/getJSONAssets';
import { AssetImage } from 'popup/reducers/assetImages';

import config from '../../config';

const getAssetImages = async <T extends AssetLike>(assets: T[]) => {
  const assetsInJSON = getJSONAssets(assets);

  const assetImagesResult = await fetch(config.ASSET_SERVER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(assetsInJSON),
  }).then((res) => res.json());

  const assetImages: AssetImage[] = assetImagesResult;

  return assetImages;
};

export default getAssetImages;
