import { Operation } from '@stellar/stellar-sdk';

export default ({ asset, limit, source }) =>
  Operation.changeTrust({
    source,
    asset,
    limit,
  });
