import StellarSdk from 'stellar-sdk';

export default ({
  sendAsset,
  sendMax,
  destination,
  destAsset,
  destAmount,
  path,
}) => StellarSdk.Operation.pathPaymentStrictReceive({
  path,
  sendMax,
  sendAsset,
  destAsset,
  destAmount,
  destination,
});
