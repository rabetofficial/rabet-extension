import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendAmount, destination, destAsset, destMin, path }) => {
  return StellarSdk.Operation.pathPaymentStrictSend({
    path,
    destMin,
    destAsset,
    sendAsset,
    sendAmount,
    destination,
  });
};
