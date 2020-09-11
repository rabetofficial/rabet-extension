import StellarSdk from 'stellar-sdk';

import store from 'Root/store';
import types from 'Root/actions';

import storeAccount from './store';

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

    store.dispatch({
      type: types.accounts.CHANGE_ACTIVE,
      publicKey: account.publicKey,
    });

    await storeAccount();

    return true;
  } catch (e) {
    return false;
  }
};
