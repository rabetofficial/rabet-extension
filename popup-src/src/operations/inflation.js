import StellarSdk from 'stellar-sdk';

export default ({ source }) => {
  return StellarSdk.Operation.inflation({
    source,
  });
};
