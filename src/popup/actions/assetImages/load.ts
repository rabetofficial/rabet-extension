import { load } from 'popup/reducers/assetImages';
import { addAssetImages } from 'popup/reducers/accounts';

const loadAssetImagesAction = (newAssetImages, publicKey) => {
  addAssetImages({
    publicKey,
    assetImages: newAssetImages,
  });
  load(newAssetImages);
};

export default loadAssetImagesAction;
