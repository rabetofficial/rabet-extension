import StellarSdk from 'stellar-sdk';

export default ({ bumpTo, source }) => {
  return StellarSdk.Operation.bumpSequence({
    bumpTo,
    source,
  });
};
