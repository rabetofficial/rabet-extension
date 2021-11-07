import { Keypair } from 'stellar-sdk';

import types from '../index';
import store from '../../store';
import changeActive from './changeActive';

export default async (privateKey) => {
  let source;

  try {
    source = Keypair.fromSecret(privateKey);
  } catch (e) {
    return null;
  }

  const { accounts } = store.getState();

  const account = {
    privateKey,
    name: 'My account',
    publicKey: source.publicKey(),
  };

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].publicKey === account.publicKey) {
      return 'duplicate';
    }
  }

  store.dispatch({
    type: types.accounts.ADD,
    account,
  });

  changeActive(account.publicKey);

  return account;
};
