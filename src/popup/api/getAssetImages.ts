import { Horizon } from 'stellar-sdk';

import getJSONAssets from 'popup/utils/getJSONAssets';
import { AssetImage } from 'popup/reducers/assetImages';
import config from '../../config';

const getAssetImages = async (assets: Horizon.BalanceLine[]) => {
  const assetsInJSON = getJSONAssets(assets);

  const assetImagesResult = await fetch(
    `${config.ASSET_SERVER}/assets/list`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ assets: assetsInJSON }),
    },
  ).then((res) => res.json());

  const assetImages: AssetImage[] = assetImagesResult.assets;

  return assetImages;
};

export default getAssetImages;
