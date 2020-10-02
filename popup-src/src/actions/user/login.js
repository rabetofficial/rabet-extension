import store from 'Root/store';
import types from 'Root/actions';

import { get } from 'Root/helpers/storage';

export default async (password) => {
  try {
    const data = await get('data', password);
    const options = await get('options', password);

    console.log('options', options);

    store.dispatch({
      options,
      type: types.options.LOAD,
    });

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
