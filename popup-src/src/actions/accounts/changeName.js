import store from 'Root/store';
import types from 'Root/actions';
import currentActiveAccount from 'Root/helpers/activeAccount';

export default (name) => {
  const { activeAccount, activeAccountIndex } = currentActiveAccount();

  store.dispatch({
    name,
    type: types.accounts.CHANGE_NAME,
    publicKey: activeAccount.publicKey,
  })
};
