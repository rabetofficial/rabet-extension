import StellarSdk from 'stellar-sdk';

export default ({ destination, source }) => {
  return StellarSdk.Operation.accountMerge({
    destination,
    source,
  });
};
