import StellarSdk from 'stellar-sdk';
import { add, IAccount } from 'popup/reducers/accounts';

import changeActive from './changeActive';

export default async (name: string): Promise<boolean> => {
  try {
    const pair = StellarSdk.Keypair.random();

    const account: IAccount = {
      name,
      publicKey: pair.publicKey(),
      privateKey: pair.secret(),
      balance: 0,
    };

    add(account);

    changeActive(account.publicKey);

    return true;
  } catch (e) {
    return false;
  }
};
