import { Keypair } from 'stellar-sdk';

import store from 'Root/store';
import types from 'Root/actions';

import storeAccount from './store';
import changeActive from './changeActive';

export default async (privateKey) => {
  let source;

  try {
    source = Keypair.fromSecret(privateKey);
  } catch (e) {
    return null;
  }

  const accounts = store.getState().accounts;

  const account = {
    privateKey,
    name: 'My account',
    publicKey: source.publicKey(),
  };

  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].publicKey === account.publicKey) {
      return 'duplicate';
    }
  }

  store.dispatch({
    type: types.accounts.ADD,
    account,
  });

  changeActive(account.publicKey)

  return account;
};
