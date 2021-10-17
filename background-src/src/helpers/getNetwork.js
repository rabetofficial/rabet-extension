import StellarSdk from 'stellar-sdk';

const getNetwork = (network) => {
  if (network === StellarSdk.Networks.PUBLIC) {
    return 'mainnet';
  }

  if (network === StellarSdk.Networks.TESTNET) {
    return 'testnet';
  }

  const n = network.toLowerCase();

  if (n.includes('main')) {
    return 'mainnet';
  }

  return 'testnet';
};

export default getNetwork;
