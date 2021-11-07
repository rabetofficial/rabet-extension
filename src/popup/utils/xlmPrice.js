import CoinGecko from 'coingecko-api';

export default () => new Promise(async (resolve) => {
  try {
    const CoinGeckoClient = new CoinGecko();

    const data = await CoinGeckoClient.simple.price({
      ids: ['stellar'],
      vs_currencies: ['usd'],
    });

    resolve(data.data.stellar.usd);
  } catch (e) {
    resolve(0);
  }
});
