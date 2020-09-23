import horizonData from 'Root/helpers/horizon/data';

export default async (address) => {
  const data = await horizonData(address);

  const accountData = {
    balance: 0,
    flags: {},
    balances: {},
    thresholds: {},
  };


  if (JSON.stringify(data) === '{}') {
    return accountData;
  }

  accountData.balance = data.balances.find(x => x.asset_type === 'native');
  accountData.flags = data.flags;
  accountData.balances = data.balances;
  accountData.thresholds = data.thresholds;

  return accountData;
};
