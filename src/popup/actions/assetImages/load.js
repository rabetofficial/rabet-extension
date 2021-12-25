import types from '../index';
import store from '../../store';

const loadAssetImagesAction = (newAssetImages, address) => {
  store.dispatch({
    address,
    assetImages: newAssetImages,
    type: types.accounts.ADD_ASSET_IMAGES,
  });
};

export default loadAssetImagesAction;
