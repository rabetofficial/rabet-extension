import types from '../index';
import store from '../../store';
import horizonData from '../../utils/horizon/data';
import setCurrencies from '../options/setCurrencies';
import toNativePrice from '../../utils/horizon/toNativePrice';
import addAssetImagesToAssets from '../../utils/addAssetImagesToAssets';
import nativeAsset from '../../utils/nativeAsset';

// const assetFieldsToNumber = (asset) => {
//   const newAsset = {
//     ...asset,
//   };

//   if (asset.balance) {
//     newAsset.balance = parseFloat(asset.balance, 10);
//   }

//   if (asset.limit) {
//     newAsset.limit = parseFloat(asset.limit, 10);
//   }

//   if (asset.buying_liabilities) {
//     newAsset.buying_liabilities = parseFloat(asset.buying_liabilities, 10);
//   }

//   if (asset.selling_liabilities) {
//     newAsset.selling_liabilities = parseFloat(asset.selling_liabilities, 10);
//   }

//   return newAsset;
// };

export default async (address) => {
  const [data] = await Promise.all([horizonData(address)]);

  setCurrencies();

  const accountData = {
    maxXLM: 0,
    usd: 0,
    address,
    balance: 0,
    flags: {},
    balances: [{
      asset_code: 'XLM',
      asset_type: 'native',
      balance: '0',
      buying_liabilities: '0.0000000',
      selling_liabilities: '0.0000000',
      toNative: 0,
      value: 'XLM',
      label: 'XLM',
    }],
    thresholds: {},
    operations: [],
    transactions: [],
    subentry_count: 0,
    toNativeLoaded: true,
  };

  if (JSON.stringify(data) !== '{}') {
    console.log('i happen')
    accountData.balance = data.balances.find(nativeAsset).balance;
    accountData.flags = data.flags;
    accountData.balances = data.balances;
    accountData.thresholds = data.thresholds;
    accountData.subentry_count = data.subentry_count;
    accountData.toNativeLoaded = false;

    accountData.balances = accountData.balances.filter((x) => !x.liquidity_pool_id);
    // accountData.balances = accountData.balances.map(assetFieldsToNumber);

    toNativePrice(accountData.balances, address);

    // MOVING XLM TO THE BEGINNING OF AN ARRAY
    const xlm = accountData.balances.find(nativeAsset);
    accountData.balances = accountData.balances.filter((x) => !nativeAsset(x));

    if (xlm) {
      accountData.balances.unshift({
        asset_code: 'XLM',
        ...xlm,
      });
    }

    // ADD label, value to each asset
    accountData.balances = accountData.balances.map((x) => ({
      ...x,
      value: x.asset_code,
      label: x.asset_code,
    }));

    const { assetImages } = store.getState();

    if (assetImages.length) {
      accountData.balances = addAssetImagesToAssets(accountData.balances, assetImages);
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
