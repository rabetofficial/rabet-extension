import { ISend } from '../types';
import hasLoggedBefore from '../utils/hasLoggedBefore';

const isUnlocked = (send: ISend) => {
  hasLoggedBefore()
    .then((hasLogged: string) => {
      if (hasLogged) {
        send({ ok: true, isUnlocked: true });
      } else {
        send({ ok: true, isUnlocked: false });
      }
    })
    .catch(() => {
      send({ ok: true, isUnlocked: true });
    });
};

export default isUnlocked;
