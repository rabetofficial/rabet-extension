import types from '../index';
import store from '../../store';
import { get } from '../../../helpers/storage';

export default async (password) => {
  try {
    const { host } = store.getState();
    const data = await get('data', password);
    const connectedWebsites = (await get('connectedWebsites')) || [];

    const d = data.map((x) => ({
      ...x,
      isConnected: connectedWebsites.some(
        (y) => y === `${host}/${x.publicKey}`,
      ),
    }));

    store.dispatch({
      password,
      type: types.user.LOGIN,
    });

    store.dispatch({
      type: types.accounts.LOAD,
      accounts: d,
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
