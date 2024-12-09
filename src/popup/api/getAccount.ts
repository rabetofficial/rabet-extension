import { Horizon } from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

export type getAccountResult =
  Promise<Horizon.AccountResponse | null>;

const getAccount = async (publicKey: string): getAccountResult => {
  const serverURL = currentNetwork().url;

  const server = new Horizon.Server(serverURL);

  try {
    const account = await server.loadAccount(publicKey);

    return account;
  } catch (err) {
    return null;
  }
};

export default getAccount;
