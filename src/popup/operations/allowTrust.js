import StellarSdk from 'stellar-sdk';

export default ({
  trustor,
  assetCode,
  authorize,
  source,
}) => StellarSdk.Operation.allowTrust({
  source,
  trustor,
  assetCode,
  authorize,
});
