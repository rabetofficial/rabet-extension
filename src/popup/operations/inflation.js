import StellarSdk from 'stellar-sdk';

export default ({ source }) => StellarSdk.Operation.inflation({
  source,
});
