import types from '../index';
import store from '../../store';

const loadAssetImagesAction = (newAssetImages) => {
  store.dispatch({
    type: types.assetImages.LOAD,
    payload: newAssetImages,
  });
};

export default loadAssetImagesAction;
