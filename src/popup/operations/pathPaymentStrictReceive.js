import { Operation } from '@stellar/stellar-sdk';

export default ({
  sendAsset,
  sendMax,
  destination,
  destAsset,
  destAmount,
  path,
}) =>
  Operation.pathPaymentStrictReceive({
    path,
    sendMax,
    sendAsset,
    destAsset,
    destAmount,
    destination,
  });
