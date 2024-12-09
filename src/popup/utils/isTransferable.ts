import { Horizon } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';

type Values = {
  asset: Horizon.HorizonApi.BalanceLine;
  amount: string;
  destination: string;
};

type IsTransferableReturnType = [
  boolean,
  'ALLOWED' | 'INACTIVE' | 'NO_TRUST' | 'LIMIT_EXCEED',
];

const isTransferable = (
  values: Values,
  destinationAccount: Horizon.AccountResponse | null,
): IsTransferableReturnType => {
  const isAssetNative = values.asset.asset_type === 'native';

  if (!destinationAccount) {
    if (isAssetNative) {
      return [true, 'INACTIVE'];
    }

    return [false, 'INACTIVE'];
  }

  if (isAssetNative) {
    return [true, 'ALLOWED'];
  }

  if (values.asset.asset_issuer === values.destination) {
    return [true, 'ALLOWED'];
  }

  const destinationAssets = destinationAccount.balances || [];
  const selectedTokenOnDestination = destinationAssets.find(
    (asset) =>
      asset.asset_code === values.asset.asset_code &&
      asset.asset_issuer === values.asset.asset_issuer,
  );

  if (!selectedTokenOnDestination) {
    return [false, 'NO_TRUST'];
  }

  const amount = new BN(values.amount);
  const dLimit = new BN(selectedTokenOnDestination.limit);
  const dBalance = new BN(selectedTokenOnDestination.balance);

  if (amount.plus(dBalance).isGreaterThan(dLimit)) {
    return [false, 'LIMIT_EXCEED'];
  }

  return [true, 'ALLOWED'];
};

export default isTransferable;
