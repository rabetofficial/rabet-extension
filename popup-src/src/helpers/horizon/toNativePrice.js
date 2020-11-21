import fetch from 'node-fetch';

const assetPrice = async (asset) => {
  try {

    const assetDetail = await fetch(`https://horizon.stellar.org/order_book?selling_asset_type=native&buying_asset_type=${asset.asset_type}&buying_asset_code=${asset.asset_code}&buying_asset_issuer=${asset.asset_issuer}&limit=1&c=0.8775033647205482`)
      .then(res => res.json());

    if (assetDetail.status) {
      return { ...asset, toNative: 0 };
    }

    return { ...asset, toNative: assetDetail.bids[0].price };
  } catch(e) {
    return { ...asset, toNative: 0 };
  }
};

export default async (assets) => {
  const promises = [];

  for (const asset of assets) {
    promises.push(assetPrice(asset));
  }


  const prices = await Promise.all(promises);

  return prices;
};
