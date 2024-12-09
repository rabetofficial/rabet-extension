import { Networks } from '@stellar/stellar-sdk';

import store from 'popup/store';
import config from '../../config';

export default () => {
  const { options } = store.getState();

  if (options.network === 'MAINNET') {
    return {
      url: config.HORIZON.mainnet,
      passphrase: Networks.PUBLIC,
    };
  }

  if (options.network === 'TESTNET') {
    return {
      url: config.HORIZON.testnet,
      passphrase: Networks.TESTNET,
    };
  }

  return {
    url: config.HORIZON.mainnet,
    passphrase: Networks.PUBLIC,
  };
};
