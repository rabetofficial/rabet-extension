import { combineReducers } from 'redux';

import user from './user';
import options from './options';
import accounts from './accounts';
import operations from './operations';

export default combineReducers({
  user,
  options,
  accounts,
  operations,
});
