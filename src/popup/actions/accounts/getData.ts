import {
  changeData,
  IAccount,
  Balance,
} from 'popup/reducers/accounts';

import store from '../../store';
import horizonData from '../../utils/horizon/getAccount';
import setCurrencies from '../options/setCurrencies';
import toNativePrice from '../../utils/horizon/toNativePrice';
import addAssetImagesToAssets from '../../utils/addAssetImagesToAssets';
import nativeAsset from '../../utils/nativeAsset';
import matchAsset from '../../utils/matchAsset';

export default async (publicKey: string) => {
  const [data] = await Promise.all([horizonData(publicKey)]);
  const { assetImages, accounts } = store.getState();
  const activeAccount = accounts.find(
    (x) => x.publicKey === publicKey,
  );

  setCurrencies();

  const accountData: IAccount = {
    maxXLM: 0,
    balance: 0,
    balances: [
      {
        asset_code: 'XLM',
        asset_type: 'native',
        balance: '0',
        buying_liabilities: '0.0000000',
        selling_liabilities: '0.0000000',
        toNative: 0,
      },
    ],
    subentry_count: 0,
    toNativeLoaded: true,
  };

  if (JSON.stringify(data) !== '{}') {
    accountData.balance = data.balances.find(nativeAsset).balance;
    accountData.flags = data.flags;
    accountData.thresholds = data.thresholds;
    accountData.subentry_count = data.subentry_count;

    accountData.balances = data.balances.map((asset: Balance) => {
      const balances = activeAccount.balances || [];

      const currentAsset = balances.find((x) => matchAsset(x, asset));

      if (!currentAsset) {
        return asset;
      }

      if (
        asset.balance === currentAsset.balance &&
        currentAsset.toNative
      ) {
        return {
          ...asset,
          toNative: currentAsset.toNative,
        };
      }

      return asset;
    });

    accountData.balances = accountData.balances.filter(
      (x) => !x.liquidity_pool_id,
    );

    // MOVING XLM TO THE BEGINNING OF AN ARRAY
    const xlm = accountData.balances.find(nativeAsset);
    accountData.balances = accountData.balances.filter(
      (x) => !nativeAsset(x),
    );

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

    if (assetImages.length) {
      accountData.balances = addAssetImagesToAssets(
        accountData.balances,
        assetImages,
      );
    }

    // Adding a new field: Subentry_count
    accountData.maxXLM =
      (accountData.subentry_count + 2) * 0.5 + 0.005;

    toNativePrice(accountData.balances, publicKey);
  }

  changeData(accountData);

  return accountData;
};
