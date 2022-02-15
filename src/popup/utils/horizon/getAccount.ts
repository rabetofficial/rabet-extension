import { AccountResponse, Server } from 'stellar-sdk';

import currentNetwork from './currentNetwork';

export type getAccountResult = Promise<AccountResponse | null>;

const getAccount = async (publicKey: string): getAccountResult => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const account = await server.loadAccount(publicKey);

    return account;
  } catch (err) {
    return null;
  }
};

export default getAccount;
