import config from '../../../config';
import nativeAsset from '../nativeAsset';

export default async (a) => {
  if (!a.length) {
    return [];
  }

  // Exclude XLM from asset list
  const assets = a.filter((x) => !nativeAsset(x));
  const body = { assets };

  const request = await fetch(`${config.ASSET_SERVER}/assets/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const assetsDetails = await request.json();

  return assetsDetails.assets;
};
