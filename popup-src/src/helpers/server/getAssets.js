import fetch from 'node-fetch';

import config from '../../config';

export default async (asset) => {
  try {
    const assets = await fetch(`${config.ASSET_SERVER}/assets?asset_code=${asset.toUpperCase()}`).then(
      (res) => res.json(),
    );

    return assets.data;
  } catch (e) {
    return [];
  }
};
