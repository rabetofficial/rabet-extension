import { get } from '../../helpers/storage';
import { decrypt } from '../../helpers/crypto';

export default async () => {
  const rawTimer = await get('timer');
  const now = Date.now();
  const timer = JSON.parse(rawTimer);

  if (!timer || !timer.date) {
    return false;
  }

  if (timer.date < now) {
    return false;
  }

  const name = decrypt(`${timer.date}`, timer.name);

  return name;
};
