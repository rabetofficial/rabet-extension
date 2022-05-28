import { get } from '../../helpers/storage';
import { decrypt } from '../../helpers/crypto';

export default () =>
  new Promise((resolve) => {
    get('timer')
      .then((rawTimer) => {
        const now = Date.now();

        const timer = JSON.parse(rawTimer);

        if (!timer || !timer.date) {
          resolve(false);
        }

        if (timer.date < now) {
          resolve(false);
        }

        const name = decrypt(`${timer.date}`, timer.name);

        resolve(name);
      })
      .catch(() => {
        resolve(false);
      });
  });
