import store from 'Root/store';
import { set } from 'Root/helpers/storage';

export default async () => {
  try {
    const { options } = store.getState();

    await set('options', options);

    return true;
  } catch (e) {
    return false;
  }
};
