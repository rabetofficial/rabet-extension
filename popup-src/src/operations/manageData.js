import StellarSdk from 'stellar-sdk';

export default ({ name, value, source }) => {
  return StellarSdk.Operation.manageData({
    name,
    value,
    source,
  });
};
