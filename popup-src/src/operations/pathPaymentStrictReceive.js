import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendMax, destination, destAsset, destAmount }) => {
  return StellarSdk.Operation.pathPaymentStrictReceive({
    sendMax,
    sendAsset,
    destAsset,
    destAmount,
    destination,
  });
};
