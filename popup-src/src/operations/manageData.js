import StellarSdk from 'stellar-sdk';

export default ({ name, value, source }) => StellarSdk.Operation.manageData({
  name,
  value,
  source,
});
