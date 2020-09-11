import StellarSdk from 'stellar-sdk';

export default ({ trustor, assetCode, authorize, source }) => {
  return StellarSdk.Operation.allowTrust({
    source,
    trustor,
    assetCode,
    authorize,
  });
};
