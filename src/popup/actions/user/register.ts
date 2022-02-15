import store from 'popup/store';
import { set } from 'helpers/storage';
import { login, isRegistered } from 'popup/reducers/user';
import { IAccount } from 'popup/reducers/accounts2';

export default async (password: string): Promise<boolean> => {
  const accounts: IAccount[] = [];

  try {
    await set('data', accounts, password);

    store.dispatch(login(password));
    store.dispatch(isRegistered(true));

    return true;
  } catch (e) {
    return false;
  }
};
