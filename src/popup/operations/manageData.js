import { Operation } from '@stellar/stellar-sdk';

export default ({ name, value, source }) =>
  Operation.manageData({
    name,
    value,
    source,
  });
