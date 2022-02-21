import StellarSdk from 'stellar-sdk';

import isNative from '../isNative';
import BN from '../../../helpers/BN';
import currentNetwork from '../currentNetwork';

const calculatePriceImpact = async (asset1, asset2) => {
  try {
    let asset1StellarAsset = StellarSdk.Asset.native();
    let asset2StellarAsset = StellarSdk.Asset.native();

    if (!isNative(asset1)) {
      asset1StellarAsset = new StellarSdk.Asset(
        asset1.asset_code,
        asset1.asset_issuer,
      );
    }

    if (!isNative(asset2)) {
      asset2StellarAsset = new StellarSdk.Asset(
        asset2.asset_code,
        asset2.asset_issuer,
      );
    }

    const { url } = currentNetwork();
    const server = new StellarSdk.Server(url);

    if (isNative(asset1) && !isNative(asset2)) {
      const result = await server
        .orderbook(asset1StellarAsset, asset2StellarAsset)
        .limit(1)
        .call();

      if (result.bids.length > 0) {
        return new BN(result.bids[0].price);
      }

      return 0;
    }

    if (!isNative(asset1) && isNative(asset2)) {
      const result = await server
        .orderbook(asset1StellarAsset, asset2StellarAsset)
        .limit(1)
        .call();
      if (result.asks.length > 0) {
        return new BN(result.bids[0].price);
      }

      return 0;
    }

    const fromToNative = await server
      .orderbook(asset1StellarAsset, asset2StellarAsset)
      .limit(1)
      .call();

    if (fromToNative.bids.length === 0) {
      return 0;
    }

    const fromCounterPrice = new BN(fromToNative.bids[0].price);

    const nativeToTo = await server
      .orderbook(asset1StellarAsset, asset2StellarAsset)
      .limit(1)
      .call();

    if (nativeToTo.asks.length === 0) {
      return 0;
    }

    return new BN(nativeToTo.bids[0].price).times(fromCounterPrice);
  } catch (e) {
    return 0;
  }
};

export default calculatePriceImpact;
