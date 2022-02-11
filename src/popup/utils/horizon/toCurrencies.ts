import * as currencies from '../../staticRes/currencies';

const xlmPricetoUsd = async () => {
  try {
    const currenciesArr = Object.values(currencies);

    const currenciesStr = currenciesArr.reduce(
      (sum, item) => `${sum}${item.name.toLowerCase()},`,
      '',
    );

    const priceDetail = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=${currenciesStr}`,
    ).then((res) => res.json());

    console.log(priceDetail);

    const stellar = {};

    const entries = Object.entries(priceDetail.stellar);

    for (let i = 0; i < entries.length; i += 1) {
      const key = entries[i][0];
      const value = entries[i][1];

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
