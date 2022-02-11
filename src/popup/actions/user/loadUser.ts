import store from 'popup/store';
import { get } from 'helpers/storage';
import { isRegistered } from 'popup/reducers/user';
import { load, fixUsd } from 'popup/reducers/options';

export default async () => {
  try {
    const data = await get('data');
    const options = await get('options');

    if (options) {
      store.dispatch(load(options));
    }

    store.dispatch(fixUsd());

    if (data) {
      store.dispatch(isRegistered(true));

      return true;
    }

    store.dispatch(isRegistered(false));

    return true;
  } catch (e) {
    return false;
  }
};
