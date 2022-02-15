import { AccountResponse, Server, Asset } from 'stellar-sdk';

import currentNetwork from './currentNetwork';

export type getAccountResult = Promise<AccountResponse | null>;

const getAccount = async (publicKey: string): getAccountResult => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const account = await server.loadAccount(publicKey);

    // const orderbooks = server.orderbook(
    //   Asset.native(),
    //   new Asset(
    //     'RBT',
    //     'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    //   ),
    // );

    // const path = server.strictSendPaths(Asset.native(), '23', [
    //   new Asset(
    //     'RBT',
    //     'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
    //   ),
    // ]);

    // const a = await orderbooks.limit(1).call();
    // const paths = await path.call();

    // console.log(paths);

    return account;
  } catch (err) {
    return null;
  }
};

export default getAccount;
