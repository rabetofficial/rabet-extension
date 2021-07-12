import fetch from 'node-fetch';

import * as currencies from 'Root/staticRes/currencies';

const xlmPricetoUsd = async () => {
  try {
    const priceDetail = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd,eur,jpy,gbp,aud,cad,chf,cny`,
    ).then((res) => res.json());

    const stellar = {};

    for (const [key, value] of Object.entries(priceDetail.stellar)) {
      stellar[key] = {
        value,
        title: currencies[key],
      };
    }

    return stellar;
  } catch (e) {
    return {};
  }
};

export default xlmPricetoUsd;
