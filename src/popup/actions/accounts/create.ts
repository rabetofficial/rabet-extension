import { Keypair } from '@stellar/stellar-sdk';

import store from 'popup/store';
import { add, IAccount } from 'popup/reducers/accounts2';

import changeActive from './changeActive';

export default async (name: string): Promise<boolean> => {
  try {
    const pair = Keypair.random();

    const account: IAccount = {
      name,
      active: false,
      isConnected: false,
      subentry_count: 0,
      privateKey: pair.secret(),
      publicKey: pair.publicKey(),
    };

    store.dispatch(add(account));

    changeActive(account.publicKey);

    return true;
  } catch (e) {
    return false;
  }
};
