import types from '../index';
import store from '../../store';
import { set } from '../../helpers/storage';

export default async (pair) => {
  const { connectedWebsites } = store.getState().user;

  const newWebsites = [
    ...connectedWebsites,
    pair,
  ];

  store.dispatch({
    type: types.user.ADD_CONNECTED_WEBSITES,
    connectedWebsites: newWebsites,
  });

  await set('connectedWebsites', newWebsites);
};
