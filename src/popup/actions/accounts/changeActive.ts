import store from 'popup/store';
import { changeActive } from 'popup/reducers/accounts2';
import changeAccountEvent from 'popup/events/changeAccount';

import storeAccount from './store';

export default async (publicKey: string): Promise<boolean> => {
  changeAccountEvent(publicKey);

  store.dispatch(changeActive(publicKey));

  await storeAccount();

  return true;
};
