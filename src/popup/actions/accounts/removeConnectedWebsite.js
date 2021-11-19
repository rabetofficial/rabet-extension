import types from '../index';
import store from '../../store';
import { set } from '../../../helpers/storage';

export default async ({ host, publicKey }, forceUpdate) => {
  const { connectedWebsites } = store.getState().user;

  const pair = `${host}/${publicKey}`;
  const filtered = connectedWebsites.filter((x) => x !== pair);

  store.dispatch({
    type: types.user.ADD_CONNECTED_WEBSITES,
    connectedWebsites: filtered,
  });

  store.dispatch({
    type: types.accounts.CHANGE_IS_CONNECTED,
    publicKey,
    isConnected: false,
  });

  await set('connectedWebsites', filtered);

  forceUpdate();
};
