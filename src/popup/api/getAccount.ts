import { AccountResponse, Server } from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

export type getAccountResult = Promise<AccountResponse | null>;

const getAccount = async (publicKey: string): getAccountResult => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const account = await server.loadAccount(publicKey);

    // const path = server.strictSendPaths(Asset.native(), '23', [
    //   new Asset(
    //     'RBT',
    //     'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    //   ),
    // ]);

    // const paths = await path.call();

    return account;
  } catch (err) {
    return null;
  }
};

export default getAccount;
