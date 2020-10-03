import fetch from 'node-fetch';

import currentNetwork from './currentNetwork';

export default async (asset) => {
  const accountDetail = await fetch(`${currentNetwork().url}/accounts/${asset.asset_issuer}`)
    .then(res => res.json());

  if (accountDetail.status) {
    return {};
  }

  return {
    flags: accountDetail.flags,
    homeDomain: accountDetail.home_domain,
  }
};
