import store from 'popup/store';
import { set } from 'helpers/storage';

export default async () => {
  try {
    const { contacts } = store.getState();

    await set('contacts', contacts);

    return true;
  } catch (e) {
    return false;
  }
};
