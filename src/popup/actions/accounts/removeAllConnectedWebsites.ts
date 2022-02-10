import store from 'popup/store';
import { set } from 'helpers/storage';
import { addConnectedWebsites } from 'popup/reducers/user';

export default async (publicKey: string) => {
  const { connectedWebsites } = store.getState().user;

  const filtered = connectedWebsites.filter(
    (x) => !x.includes(publicKey),
  );

  addConnectedWebsites(filtered);
  await set('connectedWebsites', filtered);
};
