import store from 'popup/store';

export default () => {
  const { accounts } = store.getState();

  let activeAccount;
  let activeAccountIndex;

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
