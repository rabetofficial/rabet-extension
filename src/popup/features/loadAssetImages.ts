import store from 'popup/store';
import { load } from 'popup/reducers/assetImages';
import getAssetsImages from 'popup/api/getAssetImages';
import getActiveAccount from 'popup/utils/activeAccount';

const loadAssetImages = async () => {
  const { activeAccount: account } = getActiveAccount();
  const assets = account.assets || [];

  const assetImages = await getAssetsImages(assets);

  store.dispatch(load(assetImages));
};

export default loadAssetImages;
