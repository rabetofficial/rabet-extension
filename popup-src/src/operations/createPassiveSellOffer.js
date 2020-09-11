import StellarSdk from 'stellar-sdk';

export default ({ selling, buying, amount, price, source }) => {
  return StellarSdk.Operation.createPassiveSellOffer({
    price,
    amount,
    source,
    buying,
    selling,
  });
};
