import fetch from 'node-fetch';

import config from 'Root/config';

export default async (asset) => {
  console.log(asset);

  try {
    const assets = await fetch(`${config.ASSET_SERVER}/assets?asset_code=${asset.toUpperCase()}`).then(
      (res) => res.json(),
    );

    // console.log(assets)

    return assets.data;
  } catch (e) {
    return [];
  }
};
