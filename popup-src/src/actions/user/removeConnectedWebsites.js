import store from '../../store';
import types from '../index';
import { set } from '../../helpers/storage';

export default async (connectedWebsite) => {
  store.dispatch({
    type: types.user.REMOVE_CONNECTED_WEBSITES,
    connectedWebsite,
  });

  const { connectedWebsites } = store.getState().user;

  await set('connectedWebsites', connectedWebsites);
};
