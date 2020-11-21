import fetch from 'node-fetch';

const xlmPricetoUsd = async () => {
  try {
    const priceDetail = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd`)
      .then(res => res.json());

    return priceDetail.stellar.usd;
  } catch(e) {
    return 0;
  }
};

export default xlmPricetoUsd;
