import fetch from 'node-fetch';

import config from 'Root/config';

export default async (asset) => {
  const accountDetail = await fetch(`${config.HORIZON_API}/accounts/${asset.asset_issuer}`)
    .then(res => res.json());

  if (accountDetail.status) {
    return {};
  }

  return {
    flags: accountDetail.flags,
    homeDomain: accountDetail.home_domain,
  }
};
