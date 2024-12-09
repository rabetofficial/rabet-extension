import { Asset, Horizon } from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

type Values = {
  to: string;
  from: string;
  asset1: Horizon.HorizonApi.BalanceLine;
  asset2: Horizon.HorizonApi.BalanceLine;
};

const getStrictReceive = async (values: Values) => {
  const serverURL = currentNetwork().url;

  const server = new Horizon.Server(serverURL);

  try {
    let asset1 = Asset.native();
    let asset2 = Asset.native();

    if (
      values.asset1.asset_type === 'liquidity_pool_shares' ||
      values.asset2.asset_type === 'liquidity_pool_shares'
    ) {
      throw Error('Invalid assets');
    }

    if (values.asset1.asset_type !== 'native') {
      asset1 = new Asset(
        values.asset1.asset_code,
        values.asset1.asset_issuer,
      );
    }

    if (values.asset2.asset_type !== 'native') {
      asset2 = new Asset(
        values.asset2.asset_code,
        values.asset2.asset_issuer,
      );
    }

    const path = server.strictReceivePaths(
      [asset1],
      asset2,
      values.to,
    );

    const paths = await path.call();

    if (paths.records.length) {
      return paths.records[0];
    }

    return null;
  } catch (err) {
    return null;
  }
};

export default getStrictReceive;
