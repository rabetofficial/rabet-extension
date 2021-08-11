import store from 'Root/store';
import types from 'Root/actions';
import { set } from 'Root/helpers/storage';

export default async (publicKey) => {
    const { connectedWebsites } = store.getState().user;

    const filtered = connectedWebsites.filter(x => !x.includes(publicKey));

    store.dispatch({
        type: types.user.ADD_CONNECTED_WEBSITES,
        connectedWebsites: filtered,
      });

    await set('connectedWebsites', filtered);
};
