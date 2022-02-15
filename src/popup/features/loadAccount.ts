import store from 'popup/store';
import getAccount from 'popup/utils/horizon/getAccount';
import {
  IAccount,
  addBalances,
  addFlags,
} from 'popup/reducers/accounts2';

const loadAccount = async (account: IAccount) => {
  const accountResult = await getAccount(account.publicKey);

  if (!accountResult) {
    return;
  }

  store.dispatch(
    addBalances({
      publicKey: account.publicKey,
      balances: accountResult.balances,
    }),
  );

  store.dispatch(
    addFlags({
      publicKey: account.publicKey,
      flags: accountResult.flags,
    }),
  );
};

export default loadAccount;
