import { get } from './storage';
import { decrypt } from './crypto';

export default () => new Promise((resolve, reject) => {
  get('timer')
    .then(timer => {
      const now = Date.now();

      if (!timer || !timer.date) {
        resolve(false)
      }

      if (timer.date < now) {
        resolve(false)
      }

      const name = decrypt(`${timer.date}`, timer.name);

      resolve(name);
    })
    .catch(() => {
      resolve(false)
    })
});
