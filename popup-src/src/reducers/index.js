import { combineReducers } from 'redux';

import user from './user';
import options from './options';
import accounts from './accounts';

export default combineReducers({
  user,
  options,
  accounts,
});
