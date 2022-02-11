import { get } from 'helpers/storage';
import { isRegistered } from 'popup/reducers/user';
import { load, fixUsd } from 'popup/reducers/options';

export default async () => {
  try {
    const data = await get('data');
    const options = await get('options');

    if (options) {
      load(options);
    }

    fixUsd();

    if (data) {
      console.log('aaa', data);
      isRegistered(true);

      return true;
    }

    isRegistered(false);

    return true;
  } catch (e) {
    return false;
  }
};
