import store from 'popup/store';
import { IAccount, loadBackup } from 'popup/reducers/accounts2';

const addBackup = (accounts: IAccount[]) => {
  store.dispatch(loadBackup(accounts));
};

export default addBackup;
