import { Operation } from '@stellar/stellar-sdk';

export default ({ startingBalance, destination, source }) =>
  Operation.createAccount({
    source,
    destination,
    startingBalance,
  });
