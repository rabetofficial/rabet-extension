import fetch from 'node-fetch';

import config from 'Root/config';

export default async (assets) => {
  let balances = balances.reduce((sum, balance) => {
    if (balance.asset_type === 'native')
      return sum + 'XLM' + ',';

    return sum + balance.asset_code + ','
  }, '');

  balances = balances.slice(0, balances.length - 1);

  try {
    const assets = await fetch(`${config.ASSET_SERVER}/v1/image-assets?assets=${balances}`)
    .then(res => res.json())

    return assets.assets;
  } catch (e) {
    return [];
  }
};
