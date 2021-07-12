import { combineReducers } from 'redux';

import user from './user';
import options from './options';
import accounts from './accounts';
import currencies from './currencies';
import transaction from './transaction';

export default combineReducers({
  user,
  options,
  accounts,
  currencies,
  transaction,
});
