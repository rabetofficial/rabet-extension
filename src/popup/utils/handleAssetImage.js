import isNative from './isNative';
import xlmLogo from '../../assets/images/xlm.png';
import questionImg from '../../assets/images/question-circle.png';

const handleAssetImage = (asset) => {
  if (isNative(asset)) {
    return xlmLogo;
  }

  if (!asset.logo) {
    return questionImg;
  }

  return asset.logo;
};

export default handleAssetImage;
