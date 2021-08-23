const getNetwork = (network) => {
  const n = network.toLowerCase();

  if (n.includes('main')) {
    return 'mainnet';
  }

  return 'testnet';
};

export default getNetwork;
