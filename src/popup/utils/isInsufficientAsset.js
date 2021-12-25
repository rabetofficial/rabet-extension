import isNative from './isNative';

const isInsufficientAsset = (asset, maxXLM, a) => {
  const amount = Number.parseFloat(a, 10);
  const balance = Number.parseFloat(asset.balance, 10) || 0;

  const sellingLiabilities = Number(asset.selling_liabilities);
  const subentries = isNative(asset) ? sellingLiabilities + maxXLM : sellingLiabilities;

  if (balance <= 0) {
    return false;
  }

  if (balance < amount + subentries) {
    return false;
  }

  return true;
};

export default isInsufficientAsset;
