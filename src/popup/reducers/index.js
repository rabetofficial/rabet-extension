import { combineReducers } from 'redux';

import user from './user';
import options from './options';
import loading from './loading';
import interval from './interval';
import accounts from './accounts';
import currencies from './currencies';
import transaction from './transaction';

export default combineReducers({
  user,
  options,
  loading,
  interval,
  accounts,
  currencies,
  transaction,
});
