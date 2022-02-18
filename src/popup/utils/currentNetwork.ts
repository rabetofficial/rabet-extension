import StellarSdk from 'stellar-sdk';

import store from 'popup/store';
import config from '../../config';

export default () => {
  const { options } = store.getState();

  if (options.network === 'MAINNET') {
    return {
      url: config.HORIZON.mainnet,
      passphrase: StellarSdk.Networks.PUBLIC,
    };
  }

  if (options.network === 'TESTNET') {
    return {
      url: config.HORIZON.testnet,
      passphrase: StellarSdk.Networks.TESTNET,
    };
  }

  return {
    url: config.HORIZON.mainnet,
    passphrase: StellarSdk.Networks.PUBLIC,
  };
};
