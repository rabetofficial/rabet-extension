import StellarSdk from 'stellar-sdk';

import types from '../index';
import store from '../../store';
import changeActive from './changeActive';

export default async (name) => {
  try {
    const pair = StellarSdk.Keypair.random();

    const account = {
      name,
      publicKey: pair.publicKey(),
      privateKey: pair.secret(),
      balance: 0,
    };

    store.dispatch({
      type: types.accounts.ADD,
      account,
    });

    changeActive(account.publicKey);

    return true;
  } catch (e) {
    return false;
  }
};
