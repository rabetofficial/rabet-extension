import store from 'Root/store';

export default () => {
  const { accounts } = store.getState();

  let activeAccount;
  let activeAccountIndex;

  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      activeAccountIndex = i;
      break;
    }
  }

  if (!activeAccount) {
    activeAccountIndex = 0;
    activeAccount = accounts[0];
  }

  return {
    activeAccount,
    activeAccountIndex,
  };
};
