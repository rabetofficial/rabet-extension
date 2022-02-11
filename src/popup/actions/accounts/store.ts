import store from 'popup/store';
import { set } from 'helpers/storage';

export default async (): Promise<boolean> => {
  try {
    const { user, accounts } = store.getState();
    const { password } = user;

    await set('data', accounts, password);

    return true;
  } catch (e) {
    return false;
  }
};
