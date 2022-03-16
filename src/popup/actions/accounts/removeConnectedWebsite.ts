import store from 'popup/store';
import { set } from 'helpers/storage';
import { addConnectedWebsites } from 'popup/reducers/user';
import { changeIsConnected } from 'popup/reducers/accounts2';

type RemoveConnectedWebsitesArgs = {
  host: string;
  publicKey: string;
};

export default async ({
  host,
  publicKey,
}: RemoveConnectedWebsitesArgs) => {
  const { connectedWebsites } = store.getState().user;

  const pair = `${host}/${publicKey}`;
  const filtered = connectedWebsites.filter((x) => x !== pair);

  store.dispatch(addConnectedWebsites(filtered));
  store.dispatch(
    changeIsConnected({
      publicKey,
      isConnected: false,
    }),
  );

  await set('connectedWebsites', filtered);
};
