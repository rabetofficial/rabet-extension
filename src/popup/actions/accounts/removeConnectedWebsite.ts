import store from 'popup/store';
import { set } from 'helpers/storage';
import { addConnectedWebsites } from 'popup/reducers/user';
import { changeIsConnected } from 'popup/reducers/accounts';

export default async (
  { host, publicKey }: { host: string; publicKey: string },
  forceUpdate,
) => {
  const { connectedWebsites } = store.getState().user;

  const pair = `${host}/${publicKey}`;
  const filtered = connectedWebsites.filter((x) => x !== pair);

  addConnectedWebsites(filtered);
  changeIsConnected({
    publicKey,
    isConnected: false,
  });

  await set('connectedWebsites', filtered);

  forceUpdate();
};
