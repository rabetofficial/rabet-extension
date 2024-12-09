import { Operation } from '@stellar/stellar-sdk';

export default ({
  sendAsset,
  sendAmount,
  destination,
  destAsset,
  destMin,
  path,
}) =>
  Operation.pathPaymentStrictSend({
    path,
    destMin,
    destAsset,
    sendAsset,
    sendAmount,
    destination,
  });
