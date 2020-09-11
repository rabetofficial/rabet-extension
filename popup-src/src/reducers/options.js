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
  network: StellarSdk.NETWORK,
  privacyMode: false,
  autoTimeLocker: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.options.CHANGE: {
      return {
        ...state,
        ...action,
      }
    }

    default: {
      return state;
    }
  }
}
