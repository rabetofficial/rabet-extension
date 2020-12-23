import fetch from 'node-fetch';

import config from 'Root/config';

export default async (assets) => {
  if (!assets.length) {
    return [];
  }

  let balances = assets.reduce((sum, balance) => {
    if (balance.asset_type === 'native')
      return sum + 'XLM' + ',';

    return sum + balance.asset_code + ','
  }, '');

  balances = balances.slice(0, balances.length - 1);

  try {
    const assetsDetails = await fetch(`${config.ASSET_SERVER}/v1/image-assets?assets=${balances}`)
    .then(res => res.json())

    return assetsDetails.assets.filter(x => x !== null);
  } catch (e) {
    return [];
  }
};
