import fetch from 'node-fetch';

import store from '../store';
import types from '../actions';

import currentNetwork from './horizon/currentNetwork';

const addressBalance = async (address) => {
  try {
    const addressDetail = await fetch(`${currentNetwork().url}/accounts/${address}`)
      .then((res) => res.json());

    if (addressDetail.status) {
      return {
        address,
        balance: 0,
      };
    }

    const xlm = addressDetail.balances.find((x) => x.asset_type === 'native');

    if (xlm) {
      return {
        address,
        balance: xlm.balance,
      };
    }

    return {
      address,
      balance: 0,
    };
  } catch (e) {
    return {
      address,
      balance: 0,
    };
  }
};

export default async () => {
  const { accounts } = store.getState();

  const promises = [];

  for (const account of accounts) {
    promises.push(addressBalance(account.publicKey));
  }

  const balances = await Promise.all(promises);

  for (let i = 0; i < balances.length; i += 1) {
    store.dispatch({
      type: types.accounts.UPDATE_BALANCE,
      balance: balances[i],
    });
  }

  return balances;
};
