import store from 'Root/store';
import types from 'Root/actions';
import { get } from 'Root/helpers/storage';

export default async (password) => {
  try {
    const data = await get('data', password);

    store.dispatch({
      password,
      type: types.user.LOGIN,
    });

    store.dispatch({
      type: types.accounts.LOAD,
      accounts: data,
    });

    return true;
  } catch (e) {
    return false;
  }
};
