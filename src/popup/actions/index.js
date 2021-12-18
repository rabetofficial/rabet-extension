export default {
  options: {
    LOAD: 'options/LOAD',
    CHANGE: 'options/CHANGE',
    FIX_USD: 'options/FIX_USD',
    CHANGE_NETWORK: 'options/CHANGE_NETWORK',
  },
  user: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
    IS_REGISTERED: 'user/IS_REGISTERED',
    ADD_CONNECTED_WEBSITES: 'user/ADD_CONNECTED_WEBSITES',
    REMOVE_CONNECTED_WEBSITES: 'user/REMOVE_CONNECTED_WEBSITES',
  },
  interval: {
    STOP: 'interval/STOP',
    START: 'interval/START',
  },
  accounts: {
    ADD: 'accounts/ADD',
    LOAD: 'accounts/LOAD',
    REMOVE: 'accounts/REMOVE',
    CHANGE_DATA: 'accounts/CHANGE_DATA',
    CHANGE_NAME: 'accounts/CHANGE_NAME',
    CHANGE_IS_CONNECTED: 'accounts/IS_CONNECTED',
    CHANGE_ACTIVE: 'accounts/CHANGE_ACTIVE',
    UPDATE_BALANCE: 'accounts/UPDATE_BALANCE',
  },
  transaction: {
    ADD_MEMO: 'transaction/ADD_MEMO',
    CLEAR_MEMO: 'transaction/CLEAR_MEMO',
    ADD_OP: 'transaction/ADD_OP',
    CLEAR_OP: 'transaction/CLEAR_OP',
    REMOVE_OP: 'transaction/REMOVE_OP',
    CHANGE_OP: 'transaction/CHANGE_OP',
  },
  currencies: {
    LOAD: 'currencies/LOAD',
  },
  loading: {
    LOAD_DATA: 'loading/LOAD_DATA',
  },
  host: {
    CHANGE: 'host/CHANGE',
  },
  assetImages: {
    LOAD: 'assetImages/LOAD',
  },
};
