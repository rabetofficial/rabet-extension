import StellarSdk from 'stellar-sdk';

export default ({ startingBalance, destination, source }) => {
  return StellarSdk.Operation.createAccount({
    source,
    destination,
    startingBalance,
  });
};
