import store from 'popup/store';
import { load } from 'popup/reducers/assetImages';
import { addAssetImages } from 'popup/reducers/accounts';

const loadAssetImagesAction = (newAssetImages, publicKey) => {
  store.dispatch(
    addAssetImages({
      publicKey,
      assetImages: newAssetImages,
    }),
  );
  store.dispatch(load(newAssetImages));
};

export default loadAssetImagesAction;
