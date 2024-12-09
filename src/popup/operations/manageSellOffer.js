import { Operation } from '@stellar/stellar-sdk';

export default ({
  selling,
  buying,
  amount,
  price,
  offerId,
  source,
}) =>
  Operation.manageSellOffer({
    price,
    amount,
    buying,
    source,
    selling,
    offerId,
  });
