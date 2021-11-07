import store from '../../store';
import { set } from '../../../helpers/storage';

export default async () => {
  try {
    const { options } = store.getState();

    await set('options', options);

    return true;
  } catch (e) {
    return false;
  }
};
