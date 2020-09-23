import types from 'Root/actions';

/*
  Accounts instance:

  [{
    name: String,
    publicKey: String,
    privateKey: String,
    active: Boolean,
    balance: Number,
    flags: Object,
    thresholds: Object,
    balances: Array,
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

    case types.accounts.CHANGE_NAME: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; ++i) {
        if (accounts[i].publicKey === action.publicKey) {
          accounts[i].name = action.name;
          accounts[i].active = true;
        }
      }

      return accounts;
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
