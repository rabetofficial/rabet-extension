import store from 'Root/store';
import { set } from 'Root/helpers/storage';

export default async () => {
  try {
    const { password } = store.getState().user;
    const { options } = store.getState();

    await set('options', options, password);

    return true;
  } catch (e) {
    return false;
  }
};
