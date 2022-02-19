import { Server } from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

const assetExistsOnNetwork = async (code: string, issuer: string) => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const assetResult = await server
      .assets()
      .forCode(code)
      .forIssuer(issuer)
      .call();

    return !!assetResult.records.length;
  } catch (e) {
    return false;
  }
};

export default assetExistsOnNetwork;
