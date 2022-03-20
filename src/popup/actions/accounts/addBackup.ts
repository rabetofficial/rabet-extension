import store from 'popup/store';
import { IAccount, loadBackup } from 'popup/reducers/accounts2';

import storeAccount from './store';

const addBackup = async (accounts: IAccount[]) => {
  store.dispatch(loadBackup(accounts));

  await storeAccount();
};

export default addBackup;
