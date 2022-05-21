import { get } from 'helpers/storage';
import { decrypt } from 'helpers/crypto';

export default async (): Promise<string> => {
  const rawTimer = await get('timer');
  const now = Date.now();
  const timer = JSON.parse(rawTimer);

  if (!timer || !timer.date) {
    return '';
  }

  if (timer.date < now) {
    return '';
  }

  const name = decrypt(`${timer.date}`, timer.name);

  return name;
};
