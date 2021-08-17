import fetch from 'node-fetch';

import config from '../../config';

export default async (assets) => {
  if (!assets.length) {
    return [];
  }

  const assetsMapped = assets.map((x) => x.asset_code);
  const assetsStr = assetsMapped.join(',');

  try {
    const assetsDetails = await fetch(`${config.ASSET_SERVER}/assets/image?assets=${assetsStr}`)
      .then((res) => res.json());

    return assetsDetails.assets.filter((x) => x !== null);
  } catch (e) {
    return [];
  }
};
