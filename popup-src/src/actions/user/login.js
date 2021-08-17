import types from '../index';
import store from '../../store';
import { get } from '../../helpers/storage';

export default async (password) => {
  try {
    const data = await get('data', password);
    const connectedWebsites = await get('connectedWebsites');

    store.dispatch({
      password,
      type: types.user.LOGIN,
    });

    store.dispatch({
      type: types.accounts.LOAD,
      accounts: data,
    });

    store.dispatch({
      type: types.user.ADD_CONNECTED_WEBSITES,
      connectedWebsites: connectedWebsites || [],
    });

    return true;
  } catch (e) {
    return false;
  }
};
