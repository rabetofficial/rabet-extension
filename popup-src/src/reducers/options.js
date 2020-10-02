import StellarSdk from 'stellar-sdk';

import types from 'Root/actions';

/*
  Option instance:

  {
    network: String,
    autoTimeLocker: String,
    privacyMode: Boolean,
  }

*/

const initialState = {
  explorer: 'steexp',
  network: 'MAINNET',
  privacyMode: true,
  autoTimeLocker: 30,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.options.CHANGE: {
      return {
        ...state,
        ...action.options,
      }
    }

    case types.options.LOAD: {
      return action.options;
    }

    case types.options.CHANGE_NETWORK: {
      return {
        ...state,
        network: action.network,
      }
    }

    default: {
      return state;
    }
  }
}
