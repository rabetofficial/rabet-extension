import { Networks } from '@stellar/stellar-sdk';

const getNetwork = (network) => {
  if (network === Networks.PUBLIC) {
    return 'mainnet';
  }

  if (network === Networks.TESTNET) {
    return 'testnet';
  }

  const n = network.toLowerCase();

  if (n.includes('main')) {
    return 'mainnet';
  }

  return 'testnet';
};

export default getNetwork;
