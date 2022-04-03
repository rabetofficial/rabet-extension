import { Balance } from 'popup/reducers/accounts2';
import { AssetImage } from 'popup/reducers/assetImages';

const addAssetImagesToAssets = (
  b: Partial<Balance>[],
  assetImages: AssetImage[],
): Balance[] => {
  const balances = [];

  for (let i = 0, len = b.length; i < len; i += 1) {
    const asset = b[i];
    const assetImage = assetImages.find(
      (x) =>
        x.asset_code === asset.asset_code &&
        x.asset_issuer === asset.asset_issuer,
    );

    balances.push({
      ...b[i],
      logo: assetImage?.logo,
      domain: assetImage?.domain,
    });
  }

  return balances;
};

export default addAssetImagesToAssets;
