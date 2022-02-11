import { changeActive } from 'popup/reducers/accounts';
import changeAccountEvent from 'popup/events/changeAccount';

import interval from './interval';
import storeAccount from './store';

export default async (publicKey: string): Promise<boolean> => {
  changeAccountEvent(publicKey);

  changeActive({
    publicKey,
  });

  interval(publicKey, false);

  await storeAccount();

  return true;
};
