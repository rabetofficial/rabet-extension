import { Keypair } from 'stellar-sdk';

import store from 'popup/store';
import { add, IAccount } from 'popup/reducers/accounts2';

import changeActive from './changeActive';

export default async (privateKey: string) => {
  let source;

  try {
    source = Keypair.fromSecret(privateKey);
  } catch (e) {
    return null;
  }

  const { accounts } = store.getState();

  const account: IAccount = {
    privateKey,
    active: false,
    isConnected: false,
    name: 'My account',
    publicKey: source.publicKey(),
  };

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].publicKey === account.publicKey) {
      return 'duplicate';
    }
  }

  store.dispatch(add(account));
  changeActive(account.publicKey);

  return account;
};
