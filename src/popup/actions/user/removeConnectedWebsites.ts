import store from 'popup/store';
import { set } from 'helpers/storage';
import { removeConnectedWebsite } from 'popup/reducers/user';

export default async (connectedWebsite: string) => {
  removeConnectedWebsite(connectedWebsite);

  const { connectedWebsites } = store.getState().user;

  await set('connectedWebsites', connectedWebsites);
};
