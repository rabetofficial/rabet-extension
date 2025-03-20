import { ActionState, ISend } from '../types';

import { Networks } from '@stellar/stellar-sdk';

const getNetwork = async (send: ISend, state: ActionState) => {
  let passPhrase = Networks.PUBLIC;

  if (state.options.network === 'TESTNET') {
    passPhrase = Networks.TESTNET;
  }

  send({ ok: true, network: passPhrase });
};

export default getNetwork;
