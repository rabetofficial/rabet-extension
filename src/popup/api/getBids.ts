import { Horizon, Asset } from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

const getBids = async (assets: Horizon.HorizonApi.BalanceLine[]) => {
  const serverURL = currentNetwork().url;

  const server = new Horizon.Server(serverURL);

  const orderbooks = [];

  for (let i = 0; i < assets.length; i += 1) {
    const asset = assets[i];

    if (
      asset.asset_type === 'credit_alphanum4' ||
      asset.asset_type === 'credit_alphanum12'
    ) {
      orderbooks.push(
        server
          .orderbook(
            Asset.native(),
            new Asset(asset.asset_code, asset.asset_issuer),
          )
          .limit(1)
          .call(),
      );
    }
  }

  const bids = await Promise.all(orderbooks);

  const newBids = bids.map((bid) => ({
    price: bid.bids[0]?.price || '0',
    counter: {
      asset_code: bid.counter.asset_code,
      asset_issuer: bid.counter.asset_issuer,
    },
  }));

  return newBids;
};

export default getBids;
