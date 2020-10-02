import store from 'Root/store';
import types from 'Root/actions';
import xlmPrice from 'Root/helpers/xlmPrice';
import horizonData from 'Root/helpers/horizon/data';
import transactions from 'Root/helpers/horizon/transactions';

export default async (address) => {
  const data = await horizonData(address);

  const accountData = {
    usd: 0,
    address,
    balance: 0,
    flags: {},
    balances: [],
    thresholds: {},
    transactions: [],
  };

  if (JSON.stringify(data) !== '{}') {
    accountData.balance = data.balances.find(x => x.asset_type === 'native').balance;
    accountData.flags = data.flags;
    accountData.balances = data.balances;
    accountData.thresholds = data.thresholds;

    const xlmToUsd = await xlmPrice();

    accountData.usd = xlmToUsd * accountData.balance;

    const accountTransactions = await transactions(address);

    accountData.transactions = accountTransactions;
  }

  store.dispatch({
    accountData,
    type: types.accounts.CHANGE_DATA,
  });

  return accountData;
};
