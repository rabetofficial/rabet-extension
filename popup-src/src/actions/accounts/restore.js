import { Keypair } from 'stellar-sdk';

import store from 'Root/store';
import types from 'Root/actions';

import storeAccount from './store';

export default async (privateKey) => {
  let source;

  try {
    source = Keypair.fromSecret(privateKey);
  } catch (e) {
    return null;
  }

  const account = {
    privateKey,
    name: 'My account',
    publicKey: source.publicKey(),
  };

  store.dispatch({
    type: types.accounts.ADD,
    account,
  });

  store.dispatch({
    type: types.accounts.CHANGE_ACTIVE,
    publicKey: account.publicKey,
  });

  await storeAccount();

  return account;
};
