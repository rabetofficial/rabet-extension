import store from 'Root/store';
import types from 'Root/actions';

export default async (name) => {
  const accounts = store.getState().accounts;

  let activeAccount;

  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      break;
    }
  }

  if (!activeAccount) {
    activeAccount = accounts[0];
  }

  store.dispatch({
    name,
    type: types.accounts.CHANGE_NAME,
    publicKey: activeAccount.publicKey,
  })
};
