import StellarSdk from 'stellar-sdk';

export default ({ asset, amount, destination, source }) => {
  return StellarSdk.Operation.payment({
    asset,
    amount,
    source,
    destination,
  });
};
