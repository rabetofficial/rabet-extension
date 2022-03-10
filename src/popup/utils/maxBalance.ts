import { Horizon } from 'stellar-sdk';

import BN from 'helpers/BN';
import matchAsset from 'popup/utils/matchAsset';
import { IAccount } from 'popup/reducers/accounts2';

const getMaxBalance = (
  asset: Horizon.BalanceLine,
  account: IAccount,
) => {
  const assets = account.assets || [];

  const isNativeAsset = asset.asset_type === 'native';
  const maxXLM = isNativeAsset ? account.subentry_count : 0;

  let selectedAsset;

  if (isNativeAsset) {
    selectedAsset = assets.find((x) => x.asset_type === 'native');
  } else {
    selectedAsset = assets.find((x) => matchAsset(x, asset));
  }

  const nSL = selectedAsset.selling_liabilities;

  const subentries = new BN(maxXLM).plus(nSL);
  const result = new BN(selectedAsset.balance).minus(subentries);

  return result.toFixed(7);
};

export default getMaxBalance;
