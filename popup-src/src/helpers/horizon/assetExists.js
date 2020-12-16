import fetch from 'node-fetch';

import config from 'Root/config';

export default async ({ code, issuer }) => {
  try {
    const assetDetail = await fetch(`${config.HORIZON.mainnet}/assets?asset_code=${code}&asset_issuer=${issuer}`)
      .then(res => res.json());

    if (assetDetail.status) {
      return false;
    }

    if (!assetDetail._embedded.records.length) {
      return false;
    }

    return true;
  } catch(e) {
    return false;
  }
};
