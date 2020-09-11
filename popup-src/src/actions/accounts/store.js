import store from 'Root/store';
import { set } from 'Root/helpers/storage';

export default async () => {
  try {
    const { password } = store.getState().user;
    const { accounts } = store.getState();

    await set('data', accounts, password);

    return true;
  } catch (e) {
    return false;
  }
};
