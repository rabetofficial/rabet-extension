import { Operation } from '@stellar/stellar-sdk';

export default ({ asset, amount, destination, source }) =>
  Operation.payment({
    asset,
    amount,
    source,
    destination,
  });
