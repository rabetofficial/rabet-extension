import store from 'Root/store';
import types from 'Root/actions';

import { set } from 'Root/helpers/storage';

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
