import { Horizon } from 'stellar-sdk';

import BN from 'helpers/BN';
import { IAccount } from 'popup/reducers/accounts2';

const getMaxBalance = (
  asset: Horizon.BalanceLine,
  account: IAccount,
) => {
  const maxXLM =
    asset.asset_type === 'native' ? account.subentry_count : 0;

  if (asset.asset_type === 'liquidity_pool_shares') {
    return '0';
  }

  const subentries = new BN(maxXLM).plus(asset.selling_liabilities);
  const result = new BN(asset.balance).minus(subentries);

  return result.toFixed(7);
};

export default getMaxBalance;
