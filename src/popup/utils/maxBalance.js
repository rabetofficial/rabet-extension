import isNative from './isNative';
import nativeAsset from './nativeAsset';
import arithmeticNumber from './arithmetic';
import currentActiveAccount from './activeAccount';

const getMaxBalance = (selected) => {
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();

  if (isNative(selected)) {
    const selectedAsset = balances.find((x) => nativeAsset(x));

    const maxBalance = arithmeticNumber(
      parseFloat(selectedAsset.balance, 10) - maxXLM,
    );

    return maxBalance;
  }

  const selectedAsset = balances.find((x) => x.asset_code === selected.asset_code
    && x.asset_issuer === selected.asset_issuer);

  return selectedAsset.balance - parseFloat(selectedAsset.selling_liabilities);
};

export default getMaxBalance;
