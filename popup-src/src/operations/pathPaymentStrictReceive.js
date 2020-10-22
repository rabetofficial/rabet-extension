import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendMax, destination, destAsset, destAmount, path, source }) => {
  return StellarSdk.Operation.pathPaymentStrictReceive({
    sendMax,
    sendAsset,
    destAsset,
    destAmount,
    destination,
  });
};
