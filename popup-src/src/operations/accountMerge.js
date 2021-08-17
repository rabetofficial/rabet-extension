import StellarSdk from 'stellar-sdk';

export default ({ destination, source }) => StellarSdk.Operation.accountMerge({
  destination,
  source,
});
