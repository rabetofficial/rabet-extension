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
    publicKey: source.publicKey(),
  };

  store.dispatch({
    type: types.accounts.ADD,
    account,
  });

  const stored = await storeAccount(account);

  return account;
};
