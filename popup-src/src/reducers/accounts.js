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
    subentry_count: Number,
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

    case types.accounts.CHANGE_DATA: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; ++i) {
        if (accounts[i].publicKey === action.accountData.address) {
          accounts[i].usd = action.accountData.usd;
          accounts[i].flags = action.accountData.flags;
          accounts[i].maxXLM = action.accountData.maxXLM;
          accounts[i].balance = action.accountData.balance;
          accounts[i].balances = action.accountData.balances;
          accounts[i].operations = action.accountData.operations;
          accounts[i].thresholds = action.accountData.thresholds;
          accounts[i].transactions = action.accountData.transactions;
          accounts[i].subentry_count = action.accountData.subentry_count;
        }
      }

      return accounts;
    }

    case types.accounts.UPDATE_BALANCE: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; ++i) {
        if (accounts[i].publicKey === action.balance.address) {
          accounts[i].balance = action.balance.balance;
        }
      }

      return accounts;
    }

    default: {
      return state;
    }
  }
}
