export default {
  options: {
    LOAD: 'options/LOAD',
    CHANGE: 'options/CHANGE',
    SET_USD: 'options/SET_USD',
    CHANGE_NETWORK: 'options/CHANGE_NETWORK',
  },
  user: {
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
    IS_REGISTERED: 'user/IS_REGISTERED',
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
    CHANGE_ACTIVE: 'accounts/CHANGE_ACTIVE',
  },
  transaction: {
    ADD_MEMO: 'transaction/ADD_MEMO',
    ADD_OP: 'transaction/ADD_OP',
    CLEAR_OP: 'transaction/CLEAR_OP',
    REMOVE_OP: 'transaction/REMOVE_OP',
    CHANGE_OP: 'transaction/CHANGE_OP',
  },
}
