import { Asset, Horizon } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';
import currentNetwork from 'popup/utils/currentNetwork';

const calculatePriceImpact = async (
  asset1: Horizon.HorizonApi.BalanceLine,
  asset2: Horizon.HorizonApi.BalanceLine,
) => {
  try {
    let asset1StellarAsset = Asset.native();
    let asset2StellarAsset = Asset.native();

    if (
      asset1.asset_type === 'liquidity_pool_shares' ||
      asset2.asset_type === 'liquidity_pool_shares'
    ) {
      throw Error('invalid assets');
    }

    if (asset1.asset_type !== 'native') {
      asset1StellarAsset = new Asset(
        asset1.asset_code,
        asset1.asset_issuer,
      );
    }

    if (asset2.asset_type !== 'native') {
      asset2StellarAsset = new Asset(
        asset2.asset_code,
        asset2.asset_issuer,
      );
    }

    const { url } = currentNetwork();
    const server = new Horizon.Server(url);

    if (
      asset1.asset_type === 'native' &&
      asset2.asset_type !== 'native'
    ) {
      const result = await server
        .orderbook(asset1StellarAsset, asset2StellarAsset)
        .limit(1)
        .call();

      if (result.bids.length > 0) {
        return new BN(result.bids[0].price);
      }

      return '0';
    }

    if (
      asset1.asset_type !== 'native' &&
      asset2.asset_type === 'native'
    ) {
      const result = await server
        .orderbook(asset1StellarAsset, asset2StellarAsset)
        .limit(1)
        .call();
      if (result.asks.length > 0) {
        return new BN(result.bids[0].price);
      }

      return '0';
    }

    const fromToNative = await server
      .orderbook(asset1StellarAsset, asset2StellarAsset)
      .limit(1)
      .call();

    if (fromToNative.bids.length === 0) {
      return '0';
    }

    const fromCounterPrice = new BN(fromToNative.bids[0].price);

    const nativeToTo = await server
      .orderbook(asset1StellarAsset, asset2StellarAsset)
      .limit(1)
      .call();

    if (nativeToTo.asks.length === 0) {
      return '0';
    }

    return new BN(nativeToTo.bids[0].price).times(fromCounterPrice);
  } catch (e) {
    return '0';
  }
};

export default calculatePriceImpact;
