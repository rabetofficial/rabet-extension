import { Operation } from '@stellar/stellar-sdk';

const inflation = ({ source }) =>
  Operation.inflation({
    source,
  });

export default inflation;
