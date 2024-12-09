import { Operation } from '@stellar/stellar-sdk';

export default ({ trustor, assetCode, authorize, source }) =>
  Operation.allowTrust({
    source,
    trustor,
    assetCode,
    authorize,
  });
