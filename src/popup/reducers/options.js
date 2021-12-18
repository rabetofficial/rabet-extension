import types from '../actions';

/*
  Option instance:

  {
    network: String,
    explorer: String,
    privacyMode: Boolean,
    autoTimeLocker: String,
    currency: String,
    mode: 'BASIC' | 'ADVANCED',
  }

*/

const initialState = {
  privacyMode: true,
  explorer: 'steexp',
  network: 'MAINNET',
  autoTimeLocker: 60,
  currency: 'USD',
  mode: 'BASIC',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.options.CHANGE: {
      return {
        ...state,
        ...action.options,
      };
    }

    case types.options.FIX_USD: {
      if (state.currency === 'usd') {
        return {
          ...state,
          currency: 'USD',
        };
      }

      return state;
    }

    case types.options.LOAD: {
      return action.options;
    }

    case types.options.CHANGE_NETWORK: {
      return {
        ...state,
        network: action.network,
      };
    }

    case types.options.CHANGE_MODE: {
      return {
        ...state,
        mode: action.mode,
      };
    }

    default: {
      return state;
    }
  }
};
