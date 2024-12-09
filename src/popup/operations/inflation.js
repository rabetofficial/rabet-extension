import { Operation } from '@stellar/stellar-sdk';

export default ({ source }) =>
  Operation.inflation({
    source,
  });
