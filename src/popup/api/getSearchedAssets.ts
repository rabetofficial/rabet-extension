// import fetch from 'node-fetch';

import { AssetImage } from 'popup/reducers/assetImages';

import config from '../../config';

export default async (asset_code: string): Promise<AssetImage[]> => {
  try {
    const assets: AssetImage[] = await fetch(
      `${config.ASSET_SERVER}?asset_code=${asset_code.toUpperCase()}`,
    ).then((res) => res.json());

    return assets;
  } catch (e) {
    return [];
  }
};
