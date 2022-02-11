import store from 'popup/store';
import { updateBalance } from 'popup/reducers/accounts';
import currentNetwork from './horizon/currentNetwork';

const addressBalance = async (address: string) => {
  try {
    const addressDetail = await fetch(
      `${currentNetwork().url}/accounts/${address}`,
    ).then((res) => res.json());

    if (addressDetail.status) {
      return {
        address,
        balance: 0,
      };
    }

    const xlm = addressDetail.balances.find(
      (x) => x.asset_type === 'native',
    );

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

  for (let i = 0; i < accounts.length; i += 1) {
    promises.push(addressBalance(accounts[i].publicKey));
  }

  const balances = await Promise.all(promises);

  for (let i = 0; i < balances.length; i += 1) {
    updateBalance({
      publicKey: balances[i].publicKey,
      balance: balances[i].balance,
    });
  }

  return balances;
};
