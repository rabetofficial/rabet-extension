import store from 'popup/store';
import { get } from 'helpers/storage';
import { load, IAccount } from 'popup/reducers/accounts2';
import { login, addConnectedWebsites } from 'popup/reducers/user';

export default async (password: string): Promise<boolean> => {
  try {
    const { host } = store.getState();
    const accounts: IAccount[] = await get('data', password);
    const connectedWebsites: string[] =
      (await get('connectedWebsites')) || [];

    const newAccounts = accounts.map((account) => ({
      ...account,
      isConnected: connectedWebsites.some(
        (y) => y === `${host.value}/${account.publicKey}`,
      ),
    }));

    store.dispatch(login(password));
    store.dispatch(load(newAccounts));
    store.dispatch(addConnectedWebsites(connectedWebsites));

    return true;
  } catch (e) {
    return false;
  }
};
