import { Operation } from '@stellar/stellar-sdk';

export default ({ bumpTo, source }) =>
  Operation.bumpSequence({
    bumpTo,
    source,
  });
