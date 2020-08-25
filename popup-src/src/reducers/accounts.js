import types from 'Root/actions';

/*
  Accounts instance:

  [{
    publicKey: String,
    privateKey: String,
    active: Boolean,
    balance: Number,
    type: String, [ 'only key pair', 'verified' ]
  }]

*/

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.accounts.ADD: {
      return [
        ...state,
        action.account,
      ];
    }

    case types.accounts.LOAD: {
      return action.accounts;
    }

    case types.accounts.REMOVE: {
      return state;
    }

    case types.accounts.CHANGE_ACTIVE: {
      return state;
    }

    default: {
      return state;
    }
  }
}
