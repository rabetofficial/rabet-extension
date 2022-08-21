import store from 'popup/store';
import { IAccount } from 'popup/reducers/accounts2';

export default (): {
  activeAccount: IAccount;
  activeAccountIndex: number;
} => {
  const { accounts } = store.getState();

  let activeAccount: IAccount;
  let activeAccountIndex: number;

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      activeAccountIndex = i;
      break;
    }
  }

  if (!activeAccount) {
    activeAccountIndex = 0;
    [activeAccount] = accounts;
  }

  return {
    activeAccount,
    activeAccountIndex,
  };
};
