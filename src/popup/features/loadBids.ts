import store from 'popup/store';
import getBids from 'popup/api/getBids';
import getActiveAccount from 'popup/utils/activeAccount';
import { load } from 'popup/reducers/bids';

const loadBids = async () => {
  const { activeAccount: account } = getActiveAccount();
  const assets = account.assets || [];

  const bids = await getBids(assets);

  store.dispatch(load(bids));
};

export default loadBids;
