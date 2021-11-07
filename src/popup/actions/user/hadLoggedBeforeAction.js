import { get } from '../../../helpers/storage';
import { decrypt } from '../../../helpers/crypto';

export default async () => {
  const timer = await get('timer');
  const now = Date.now();

  if (!timer || !timer.date) {
    return false;
  }

  if (timer.date < now) {
    return false;
  }

  const name = decrypt(`${timer.date}`, timer.name);

  return name;
};
