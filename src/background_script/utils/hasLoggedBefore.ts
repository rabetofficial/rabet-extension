import { decrypt } from '../../helpers/crypto';
import { getAsync } from '../../helpers/chromeHelper';

interface ITimer {
  date: number;
  name: string;
}

const hasLoggedBefore = async () => {
  try {
    const timer = await getAsync<ITimer>('timer');

    const now = Date.now();

    if (!timer || !timer.date) {
      return null;
    }

    if (timer.date < now) {
      return null;
    }

    const password: string = decrypt(`${timer.date}`, timer.name);

    return password;
  } catch (e) {
    return null;
  }
};

export default hasLoggedBefore;
