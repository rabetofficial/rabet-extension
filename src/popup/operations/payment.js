import StellarSdk from 'stellar-sdk';

export default ({
  asset,
  amount,
  destination,
  source,
}) => StellarSdk.Operation.payment({
  asset,
  amount,
  source,
  destination,
});
