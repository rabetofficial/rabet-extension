import StellarSdk from 'stellar-sdk';

export default ({ asset, limit, source }) => {
  return StellarSdk.Operation.changeTrust({
    source,
    asset,
    limit,
  });
};
