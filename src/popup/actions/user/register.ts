import store from 'popup/store';
import { set } from 'helpers/storage';
import { login, isRegistered } from 'popup/reducers/user';
import { IAccount, load } from 'popup/reducers/accounts';

export default async (password: string): Promise<boolean> => {
  const accounts: IAccount[] = [];

  try {
    await set('data', accounts, password);

    store.dispatch(load(accounts));
    store.dispatch(login(password));
    store.dispatch(isRegistered(true));

    return true;
  } catch (e) {
    return false;
  }
};
