import { Operation } from '@stellar/stellar-sdk';

export default ({ destination, source }) =>
  Operation.accountMerge({
    destination,
    source,
  });
