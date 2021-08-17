import StellarSdk from 'stellar-sdk';

export default ({
  signer,
  source,
  setFlags,
  clearFlags,
  homeDomain,
  masterWeight,
  lowThreshold,
  medThreshold,
  highThreshold,
  inflationDest,
}) => StellarSdk.Operation.setOptions({
  signer,
  source,
  setFlags,
  clearFlags,
  homeDomain,
  masterWeight,
  lowThreshold,
  medThreshold,
  highThreshold,
  inflationDest,
});
