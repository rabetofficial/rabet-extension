import StellarSdk from 'stellar-sdk';

export default ({ sendAsset, sendAmount, destination, destAsset, destMin, path, source }) => {
  return StellarSdk.Operation.pathPaymentStrictSend({
    path,
    source,
    destMin,
    destAsset,
    sendAsset,
    sendAmount,
    destination,
  });
};
