import { Server, Asset } from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

const getStrictSend = async () => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const path = server.strictSendPaths(Asset.native(), '23', [
      new Asset(
        'RBT',
        'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
      ),
    ]);

    const paths = await path.call();

    return paths;
  } catch (err) {
    return null;
  }
};

export default getStrictSend;
