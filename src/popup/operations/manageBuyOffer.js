import { Operation } from '@stellar/stellar-sdk';

export default ({
  selling,
  buying,
  buyAmount,
  price,
  offerId,
  source,
}) =>
  Operation.manageBuyOffer({
    price,
    buying,
    source,
    selling,
    offerId,
    buyAmount,
  });
