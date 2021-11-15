import StellarSdk from 'stellar-sdk';

export default ({
  selling,
  buying,
  buyAmount,
  price,
  offerId,
  source,
}) => StellarSdk.Operation.manageBuyOffer({
  price,
  buying,
  source,
  selling,
  offerId,
  buyAmount,
});
