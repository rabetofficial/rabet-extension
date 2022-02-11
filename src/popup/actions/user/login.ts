import store from 'popup/store';
import { get } from 'helpers/storage';
import { load } from 'popup/reducers/accounts';
import { login, addConnectedWebsites } from 'popup/reducers/user';

export default async (password: string): Promise<boolean> => {
  try {
    const { host } = store.getState();
    const data = await get('data', password);
    const connectedWebsites: string[] =
      (await get('connectedWebsites')) || [];

    const d = data.map((x) => ({
      ...x,
      isConnected: connectedWebsites.some(
        (y) => y === `${host}/${x.publicKey}`,
      ),
    }));

    store.dispatch(login(password));
    store.dispatch(load(d));
    store.dispatch(addConnectedWebsites(connectedWebsites || []));

    return true;
  } catch (e) {
    return false;
  }
};
