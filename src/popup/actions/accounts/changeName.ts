import { changeName } from 'popup/reducers/accounts';
import currentActiveAccount from 'popup/utils/activeAccount';

import storeAccount from './store';

export default (name: string): void => {
  const { activeAccount } = currentActiveAccount();

  changeName({ name, publicKey: activeAccount.publicKey });

  storeAccount();
};
