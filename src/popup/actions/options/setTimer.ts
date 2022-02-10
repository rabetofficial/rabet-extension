import store from 'popup/store';
import { set } from 'helpers/storage';
import { encrypt } from 'helpers/crypto';

export default async () => {
  const { user, options } = store.getState();
  const { password } = user;
  const { autoTimeLocker } = options;

  const date = new Date();

  date.setMinutes(date.getMinutes() + autoTimeLocker);

  const object = {
    date: +date,
    name: encrypt(`${+date}`, password),
  };

  set('timer', object);

  return true;
};
