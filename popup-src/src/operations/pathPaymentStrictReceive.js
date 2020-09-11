import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendMax, destination, destAsset, destAmount, path, source }) => {
  return StellarSdk.Operation.pathPaymentStrictReceive({
    path,
    source,
    sendMax,
    sendAsset,
    destAsset,
    destAmount,
    destination,
  });
};
