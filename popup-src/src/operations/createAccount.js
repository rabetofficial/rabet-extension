import StellarSdk from 'stellar-sdk';

export default ({ startingBalance, destination, source }) => StellarSdk.Operation.createAccount({
  source,
  destination,
  startingBalance,
});
