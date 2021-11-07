import store from '../../store';
import { set } from '../../../helpers/storage';

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
