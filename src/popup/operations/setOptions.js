import { Operation } from '@stellar/stellar-sdk';

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
}) =>
  Operation.setOptions({
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
