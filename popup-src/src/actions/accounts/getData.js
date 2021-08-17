import types from '../index';
import store from '../../store';
import xlmPrice from '../../helpers/xlmPrice';
import horizonData from '../../helpers/horizon/data';
import setCurrencies from '../options/setCurrencies';
import operations from '../../helpers/horizon/operations';
import transactions from '../../helpers/horizon/transactions';
import toNativePrice from '../../helpers/horizon/toNativePrice';

export default async (address) => {
  const data = await horizonData(address);

  const accountData = {
    usd: 0,
    address,
    balance: 0,
    flags: {},
    balances: [],
    thresholds: {},
    operations: [],
    transactions: [],
    subentry_count: 0,
  };

  if (JSON.stringify(data) !== '{}') {
    accountData.balance = data.balances.find((x) => x.asset_type === 'native').balance;
    accountData.flags = data.flags;
    accountData.balances = data.balances;
    accountData.thresholds = data.thresholds;
    accountData.subentry_count = data.subentry_count;

    const xlmToUsd = await xlmPrice();

    accountData.usd = accountData.balance * xlmToUsd;
    accountData.transactions = await transactions(address);
    accountData.balances = await toNativePrice(accountData.balances);

    // MOVING XLM TO THE BEGINNING OF AN ARRAY
    const xlm = accountData.balances.find((x) => x.asset_type === 'native');
    accountData.balances = accountData.balances.filter((x) => x.asset_type !== 'native');
    accountData.balances.unshift(xlm);

    accountData.operations = await operations(accountData.transactions);

    // Adding a new field: Subentry_count
    accountData.maxXLM = (accountData.subentry_count + 2) * 0.5 + 0.005;
  }

  await setCurrencies();

  store.dispatch({
    accountData,
    type: types.accounts.CHANGE_DATA,
  });

  return accountData;
};
