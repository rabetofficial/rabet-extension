import types from '../index';
import store from '../../store';
import { set } from '../../../helpers/storage';

export default async ({ host, publicKey }, forceUpdate) => {
  const { connectedWebsites } = store.getState().user;
  const pair = `${host}/${publicKey}`;

  const newWebsites = [
    ...connectedWebsites,
    pair,
  ];

  store.dispatch({
    type: types.user.ADD_CONNECTED_WEBSITES,
    connectedWebsites: newWebsites,
  });

  store.dispatch({
    type: types.accounts.CHANGE_IS_CONNECTED,
    publicKey,
    isConnected: true,
  });

  await set('connectedWebsites', newWebsites);

  forceUpdate();
};
