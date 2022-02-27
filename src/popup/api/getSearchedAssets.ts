// import fetch from 'node-fetch';

import { AssetImage } from 'popup/reducers/assetImages';

import config from '../../config';

type GetSearchedAssetsApi = {
  data: AssetImage[];
};

export default async (asset_code: string): Promise<AssetImage[]> => {
  try {
    const assets: GetSearchedAssetsApi = await fetch(
      `${
        config.ASSET_SERVER
      }/assets?asset_code=${asset_code.toUpperCase()}`,
    ).then((res) => res.json());

    return assets.data;
  } catch (e) {
    return [];
  }
};
