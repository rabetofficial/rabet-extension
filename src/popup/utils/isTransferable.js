import isNative from './isNative';
import matchAsset from './matchAsset';

/*
  Second parameter
    0 = Account is inactive
    1 = Account is invalid
    2 = Account does not truest the selected asset
    3 = Account limit exceeds on the selected asset
*/

const isTransferable = (values, destinationAccount) => {
  const isAssetNative = isNative(values.asset);

  if (destinationAccount.status === 404) {
    if (isAssetNative) {
      return [true, 0];
    }

    return [false, 0];
  }

  if (destinationAccount.status === 400) {
    return [false, 1];
  }

  if (isAssetNative) {
    return [true];
  }

  const destinationAssets = destinationAccount.balances || [];
  const selectedTokenOnDestination = destinationAssets.find((x) => matchAsset(x, values.asset));

  if (!selectedTokenOnDestination) {
    return [false, 2];
  }

  const amount = Number.parseFloat(values.amount, 10);
  const limit = Number.parseFloat(selectedTokenOnDestination.limit, 10);
  const balance = Number.parseFloat(selectedTokenOnDestination.balance, 10);

  if (limit < amount + balance) {
    return [false, 3];
  }

  return [true];
};

export default isTransferable;
