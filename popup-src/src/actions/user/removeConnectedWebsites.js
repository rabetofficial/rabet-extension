import store from 'Root/store';
import types from 'Root/actions';
import { set } from 'Root/helpers/storage';

export default async (connectedWebsite) => {
    store.dispatch({
        type: types.user.REMOVE_CONNECTED_WEBSITES,
        connectedWebsite,
    });

    const { connectedWebsites } = store.getState().user;

    await set('connectedWebsites', connectedWebsites);
};
