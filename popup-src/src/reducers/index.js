import { combineReducers } from 'redux';

import user from './user';
import options from './options';
import accounts from './accounts';
import transaction from './transaction';

export default combineReducers({
  user,
  options,
  accounts,
  transaction,
});
