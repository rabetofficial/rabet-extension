import types from 'Root/actions';

/*
  Option instance:

  {
    usd: Number,
    network: String,
    explorer: String,
    privacyMode: Boolean,
    autoTimeLocker: String,
  }

*/

const initialState = {
  usd: 0,
  privacyMode: true,
  explorer: 'steexp',
  network: 'MAINNET',
  autoTimeLocker: 60,
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

    case types.options.SET_USD: {
      return {
        ...state,
        usd: action.price,
      };
    }

    default: {
      return state;
    }
  }
}
