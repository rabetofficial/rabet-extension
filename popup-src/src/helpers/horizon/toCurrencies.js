import fetch from 'node-fetch';

import * as currencies from 'Root/staticRes/currencies';

const xlmPricetoUsd = async () => {
  try {
    const currenciesArr = Object.values(currencies)

    let currenciesStr = currenciesArr.reduce((sum, item) => {
      return sum + `${item.name.toLowerCase()},`;
    }, '')

    const priceDetail = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=${currenciesStr}`,
    ).then((res) => res.json());

    const stellar = {};

    for (const [key, value] of Object.entries(priceDetail.stellar)) {
      if (key) {
        const k = key.toUpperCase();

        stellar[k] = {
          ...currencies[k],
          value,
        };
      }
    }

    return stellar;
  } catch (e) {
    return {};
  }
};

export default xlmPricetoUsd;
