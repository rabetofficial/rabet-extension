import { combineReducers } from 'redux';

import user from './user';
import accounts from './accounts';

export default combineReducers({
  user,
  accounts,
});
