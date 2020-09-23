import StellarSdk from 'stellar-sdk';

export default (address) => {
  if (!address) {
    return false;
  }

  return StellarSdk.StrKey.isValidEd25519SecretSeed(address);
}
