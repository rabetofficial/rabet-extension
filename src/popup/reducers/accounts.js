import types from '../actions';
import matchAsset from '../utils/matchAsset';

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
    isConnected: Boolean,
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
      return state.filter((x) => x.publicKey !== action.publicKey);
    }

    case types.accounts.CHANGE_NAME: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.publicKey) {
          accounts[i].name = action.name;
          accounts[i].active = true;
        }
      }

      return accounts;
    }

    case types.accounts.CHANGE_ACTIVE: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
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

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.accountData.address) {
          accounts[i] = {
            ...accounts[i],
            ...action.accountData,
          };
        }
      }

      return accounts;
    }

    case types.accounts.UPDATE_BALANCE: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.balance.address) {
          accounts[i].balance = action.balance.balance;
        }
      }

      return accounts;
    }

    case types.accounts.ADD_ASSET_IMAGES: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.address) {
          for (let j = 0; j < accounts[i].balances.length; j += 1) {
            const asset = accounts[i].balances[j];
            const assetImage = action.assetImages.find((x) => matchAsset(x, asset));

            accounts[i].balances[j].logo = assetImage?.logo;
            accounts[i].balances[j].domain = assetImage?.domain;
          }
        }
      }

      return accounts;
    }

    case types.accounts.CHANGE_IS_CONNECTED: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.publicKey) {
          accounts[i].isConnected = action.isConnected;
        }
      }

      return accounts;
    }

    case types.accounts.ADD_NATIVE_PRICES: {
      const accounts = [...state];

      for (let i = 0; i < accounts.length; i += 1) {
        if (accounts[i].publicKey === action.address) {
          accounts[i].balances = accounts[i].balances.map((x) => {
            const findNative = action.payload.find((y) => matchAsset(y, x));

            return {
              ...x,
              toNative: findNative?.toNative,
            };
          });

          accounts[i].toNativeLoaded = true;
        }
      }

      return accounts;
    }

    default: {
      return state;
    }
  }
};
