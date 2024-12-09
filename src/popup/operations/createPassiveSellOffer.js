import { Operation } from '@stellar/stellar-sdk';

export default ({ selling, buying, amount, price, source }) =>
  Operation.createPassiveSellOffer({
    price,
    amount,
    source,
    buying,
    selling,
  });
