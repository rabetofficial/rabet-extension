import fetch from 'node-fetch';

import config from 'Root/config';

export default async (asset) => {
  try {
    const assets = await fetch(`${config.ASSET_SERVER}/v1/search-assets?asset_code=${asset.toUpperCase()}`)
    .then(res => res.json())

    return assets.assets;
  } catch (e) {
    return [];
  }
};
