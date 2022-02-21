import store from '../../store';
import config from '../../../config';

export default (transaction: string) => {
  const { options } = store.getState();

  if (options.network === 'MAINNET') {
    if (options.explorer === 'steexp') {
      return `${config.STEEXP.mainnet}/tx/${transaction}`;
    }

    if (options.explorer === 'stellarexpert') {
      return `${config.STELLAR_EXPERT.mainnet}/tx/${transaction}`;
    }

    if (options.explorer === 'lumenscan') {
      return `${config.LUMENSCAN.mainnet}/txns/${transaction}`;
    }
  } else {
    if (options.explorer === 'steexp') {
      return `${config.STEEXP.testnet}/tx/${transaction}`;
    }

    if (options.explorer === 'stellarexpert') {
      return `${config.STELLAR_EXPERT.testnet}/tx/${transaction}`;
    }

    if (options.explorer === 'lumenscan') {
      return `${config.LUMENSCAN.testnet}/txns/${transaction}`;
    }
  }

  return `${config.STEEXP.mainnet}/tx/${transaction}`;
};
