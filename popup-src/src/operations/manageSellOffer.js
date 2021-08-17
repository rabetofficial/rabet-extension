import StellarSdk from 'stellar-sdk';

export default ({
  selling,
  buying,
  amount,
  price,
  offerId,
  source,
}) => StellarSdk.Operation.manageSellOffer({
  price,
  amount,
  buying,
  source,
  selling,
  offerId,
});
