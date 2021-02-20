import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendMax, destination, destAsset, destAmount, path }) => {
  return StellarSdk.Operation.pathPaymentStrictReceive({
    path,
    sendMax,
    sendAsset,
    destAsset,
    destAmount,
    destination,
  });
};
