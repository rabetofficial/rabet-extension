import { Balance } from 'popup/reducers/accounts';
import { AssetImage } from 'popup/reducers/assetImages';

import matchAsset from './matchAsset';

const addAssetImagesToAssets = (
  b: Partial<Balance>[],
  assetImages: AssetImage[],
): Balance[] => {
  const balances = [];

  for (let i = 0, len = b.length; i < len; i += 1) {
    const asset = b[i];
    const assetImage = assetImages.find((x) => matchAsset(x, asset));

    balances.push({
      ...b[i],
      logo: assetImage?.logo,
      domain: assetImage?.domain,
    });
  }

  return balances;
};

export default addAssetImagesToAssets;
