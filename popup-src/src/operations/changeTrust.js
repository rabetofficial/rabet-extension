import StellarSdk from 'stellar-sdk';

export default ({ asset, limit, source }) => StellarSdk.Operation.changeTrust({
  source,
  asset,
  limit,
});
