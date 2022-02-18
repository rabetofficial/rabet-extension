import * as currencies from 'popup/staticRes/currencies';
import { CoinGeckoResult } from 'popup/models';
import { Currencies } from 'popup/reducers/currencies';

const xlmPricetoUsd = async () => {
  const arr = Object.values(currencies);
  const ids = arr.reduce(
    (sum, item) => `${sum}${item.name.toLowerCase()},`,
    '',
  );

  const simplePrice = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=${ids}`,
  ).then((res) => res.json());

  const toXlmPrices: CoinGeckoResult = simplePrice.stellar;
  const currencyValues = Object.entries(toXlmPrices);
  const currenciesObj: Currencies = {
    ...currencies,
  };

  for (let i = 0; i < currencyValues.length; i += 1) {
    const currency = currencyValues[i][0].toUpperCase();
    const price = currencyValues[i][1];

    currenciesObj[currency] = {
      ...currencies[currency],
      price,
    };
  }

  return currenciesObj;
};

export default xlmPricetoUsd;
