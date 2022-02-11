import store from 'popup/store';
import { changeName } from 'popup/reducers/accounts';
import currentActiveAccount from 'popup/utils/activeAccount';

import storeAccount from './store';

export default (name: string): void => {
  const { activeAccount } = currentActiveAccount();

  store.dispatch(
    changeName({ name, publicKey: activeAccount.publicKey }),
  );

  storeAccount();
};
