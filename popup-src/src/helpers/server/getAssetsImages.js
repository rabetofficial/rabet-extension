import fetch from 'node-fetch';

import config from 'Root/config';

export default async (assets) => {
  if (!assets.length) {
    return [];
  }

  try {
    const assetsDetails = await fetch(`${config.ASSET_SERVER}/v1/image-assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        assets,
      }),
    })
    .then(res => res.json())

    return assetsDetails.assets.filter(x => x !== null);
  } catch (e) {
    return [];
  }
};
