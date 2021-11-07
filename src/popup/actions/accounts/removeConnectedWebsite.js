import types from '../index';
import store from '../../store';
import { set } from '../../../helpers/storage';

export default async (pair, forceUpdate) => {
  const { connectedWebsites } = store.getState().user;

  const filtered = connectedWebsites.filter((x) => x !== pair);

  store.dispatch({
    type: types.user.ADD_CONNECTED_WEBSITES,
    connectedWebsites: filtered,
  });

  await set('connectedWebsites', filtered);

  forceUpdate();
};
