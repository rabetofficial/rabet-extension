import { ActionState, ISend } from '../types';

import { Networks } from '@stellar/stellar-sdk';

const getNetwork = async (send: ISend, state: ActionState) => {
  let networkName = 'MAINNET';
  let passphrase = Networks.PUBLIC;

  if (state.options.network === 'TESTNET') {
    networkName = 'TESTNET';
    passphrase = Networks.TESTNET;
  }

  send({
    ok: true,
    network: {
      passphrase,
      network: networkName,
    }
  });
};

export default getNetwork;
