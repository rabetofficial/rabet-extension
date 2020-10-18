import store from 'Root/store';
import { set } from 'Root/helpers/storage';
import { encrypt } from 'Root/helpers/crypto';

export default async () => {
  const { password } = store.getState().user;
  const { autoTimeLocker } = store.getState().options;
  const date = new Date();

  date.setMinutes( date.getMinutes() + autoTimeLocker );

  const object = {
    date: +date,
    name: encrypt(`${+date}`, password),
  };

  set('timer', object);

  return true;
};
