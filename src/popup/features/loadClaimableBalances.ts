import getClaimableBalances from 'popup/api/getClaimableBalances';

const loadClaimableBalances = async (publicKey: string) => {
  const claimableBalances = await getClaimableBalances(publicKey);

  return claimableBalances;
};

export default loadClaimableBalances;
