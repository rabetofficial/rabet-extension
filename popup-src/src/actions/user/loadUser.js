import store from 'Root/store';
import types from 'Root/actions';

import { get } from 'Root/helpers/storage';

export default async () => {
  try {
    const data = await get('data');

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
