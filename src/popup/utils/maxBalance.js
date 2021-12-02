import isNative from './isNative';
import matchAsset from './matchAsset';
import nativeAsset from './nativeAsset';
import arithmeticNumber from './arithmetic';
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

  return arithmeticNumber(
    parseFloat(selectedAsset.balance)
    - (maxXLM + parseFloat(selectedAsset.selling_liabilities)),
  );
};

export default getMaxBalance;
