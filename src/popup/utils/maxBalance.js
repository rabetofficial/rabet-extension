import BN from '../../helpers/BN';
import isNative from './isNative';
import matchAsset from './matchAsset';
import nativeAsset from './nativeAsset';
import currentActiveAccount from './activeAccount';

const getMaxBalance = (selected) => {
  const { activeAccount: { balances, maxXLM: max } } = currentActiveAccount();

  const isXLM = isNative(selected);
  const maxXLM = isXLM ? max : 0;

  let selectedAsset;

  if (isXLM) {
    selectedAsset = balances.find(nativeAsset);
  } else {
    selectedAsset = balances.find((x) => matchAsset(x, selected));
  }

  const subentries = new BN(maxXLM).plus(selectedAsset.selling_liabilities);
  const result = new BN(selectedAsset.balance).minus(subentries);

  return result.toFixed(7);
};

export default getMaxBalance;
