import types from 'Root/actions';

/*
  Accounts instance:

  [{
    name: String,
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
      const accounts = [...state];

      for (let i = 0; i < accounts.length; ++i) {
        if (accounts[i].publicKey === action.publicKey) {
          accounts[i].active = true;
        } else {
          accounts[i].active = false;
        }
      }

      return accounts;
    }

    default: {
      return state;
    }
  }
}
