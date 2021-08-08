import store from 'Root/store';
import types from 'Root/actions';
import { get } from 'Root/helpers/storage';

export default async (password) => {
  try {
    const data = await get('data', password);
    const connectedWebsites = await get('connectedWebsites');

    console.log(data);
    console.log(connectedWebsites)

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

/*
const cw = store.getState().user.connectedWebsites
const acw = cw.filter(x => x.includes('GBTNAWU7ZFO4O6ERKFDWAQ7Y4K6X3GSQWNMU3UBJLWKNX6YBAEGXGCWQ'));
acw.map(x => x.split('/')[0]);
*/