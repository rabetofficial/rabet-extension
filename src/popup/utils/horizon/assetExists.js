// import fetch from 'node-fetch';

import currentNetwork from './currentNetwork';

export default async ({ code, issuer }) => {
  try {
    const assetDetail = await fetch(`${currentNetwork().url}/assets?asset_code=${code}&asset_issuer=${issuer}`)
      .then((res) => res.json());

    if (assetDetail.status) {
      return false;
    }

    if (!assetDetail._embedded.records.length) {
      return false;
    }

    return true;
  } catch (e) {
    return false;
  }
};
