import StellarSdk from 'stellar-sdk';

export default ({
  selling,
  buying,
  amount,
  price,
  source,
}) => StellarSdk.Operation.createPassiveSellOffer({
  price,
  amount,
  source,
  buying,
  selling,
});
