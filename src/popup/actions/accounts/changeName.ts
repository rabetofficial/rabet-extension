import store from 'popup/store';
import { changeName } from 'popup/reducers/accounts2';

import storeAccount from './store';

export default (name: string, publicKey: string): void => {
  store.dispatch(changeName({ name, publicKey }));

  storeAccount();
};
