import types from '../index';
import store from '../../store';
import xlmPrice from '../../utils/xlmPrice';
import horizonData from '../../utils/horizon/data';
import setCurrencies from '../options/setCurrencies';
import toNativePrice from '../../utils/horizon/toNativePrice';

export default async (address) => {
  const [data] = await Promise.all([horizonData(address), setCurrencies()]);

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
    accountData.balances = accountData.balances.filter((x) => !x.liquidity_pool_id);
    accountData.balances = await toNativePrice(accountData.balances);

    // MOVING XLM TO THE BEGINNING OF AN ARRAY
    const xlm = accountData.balances.find((x) => x.asset_type === 'native');
    accountData.balances = accountData.balances.filter((x) => x.asset_type !== 'native');

    if (xlm) {
      accountData.balances.unshift({
        asset_code: 'XLM',
        ...xlm,
      });
    }

    // Adding a new field: Subentry_count
    accountData.maxXLM = (accountData.subentry_count + 2) * 0.5 + 0.005;
  }

  store.dispatch({
    accountData,
    type: types.accounts.CHANGE_DATA,
  });

  return accountData;
};
