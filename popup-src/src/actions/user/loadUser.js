import store from 'Root/store';
import types from 'Root/actions';

import { get } from 'Root/helpers/storage';

export default async () => {
  try {
    const data = await get('data');
    const options = await get('options');

    if (options) {
      store.dispatch({
        options,
        type: types.options.LOAD,
      });
    }

    store.dispatch({
      type: types.options.FIX_USD,
    });

    if (data) {
      store.dispatch({
        registered: true,
        type: types.user.IS_REGISTERED,
      });

      return true;
    }

    store.dispatch({
      registered: false,
      type: types.user.IS_REGISTERED,
    });

    return true;
  } catch (e) {
    return false;
  }
};
