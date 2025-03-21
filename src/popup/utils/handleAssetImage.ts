import { Horizon } from '@stellar/stellar-sdk';

import xlmLogo from '../../assets/images/xlm-logo.svg';
import { AssetImage } from 'popup/reducers/assetImages';
import questionLogo from '../../assets/images/question-circle.png';

const handleAssetImage = (
  asset: Horizon.HorizonApi.BalanceLine,
  assetImages: AssetImage[],
) => {
  if (!asset) {
    return questionLogo;
  }

  // @ts-ignore
  if (asset.logo) {
    // @ts-ignore
    return asset.logo;
  }

  if (asset.asset_type === 'native') {
    return xlmLogo;
  }

  if (asset.asset_type === 'liquidity_pool_shares') {
    return questionLogo;
  }

  const assetImageFound = assetImages.find(
    (assetImage) =>
      assetImage.asset_code === asset.asset_code &&
      assetImage.asset_issuer === asset.asset_issuer,
  );

  if (!assetImageFound) {
    return questionLogo;
  }

  if (assetImageFound.logo) {
    return assetImageFound.logo;
  }

  return questionLogo;
};

export default handleAssetImage;
