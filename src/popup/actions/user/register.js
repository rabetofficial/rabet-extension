import types from '../index';
import store from '../../store';
import { set } from '../../../helpers/storage';

export default async (password) => {
  const accounts = [];

  try {
    await set('data', accounts, password);

    store.dispatch({
      accounts,
      type: types.accounts.LOAD,
    });

    store.dispatch({
      password,
      type: types.user.LOGIN,
    });

    return true;
  } catch (e) {
    return false;
  }
};
