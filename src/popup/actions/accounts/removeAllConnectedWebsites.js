import types from '../index';
import store from '../../store';
import { set } from '../../../helpers/storage';

export default async (publicKey) => {
  const { connectedWebsites } = store.getState().user;

  const filtered = connectedWebsites.filter((x) => !x.includes(publicKey));

  store.dispatch({
    type: types.user.ADD_CONNECTED_WEBSITES,
    connectedWebsites: filtered,
  });

  await set('connectedWebsites', filtered);
};
