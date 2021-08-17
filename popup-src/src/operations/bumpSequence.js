import StellarSdk from 'stellar-sdk';

export default ({ bumpTo, source }) => StellarSdk.Operation.bumpSequence({
  bumpTo,
  source,
});
