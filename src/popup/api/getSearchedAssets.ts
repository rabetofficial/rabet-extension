// import fetch from 'node-fetch';

import { AssetImage } from 'popup/reducers/assetImages';

import config from '../../config';

export default async (
  value: string,
  isDomain: boolean,
): Promise<AssetImage[]> => {
  try {
    const domainQS = isDomain ? 'domain' : 'asset_code';
    const sentValue = isDomain ? value : value.toUpperCase();

    const assets: AssetImage[] = await fetch(
      `${config.ASSET_SERVER}?${domainQS}=${sentValue}`,
    ).then((res) => res.json());

    return assets;
  } catch (e) {
    return [];
  }
};
