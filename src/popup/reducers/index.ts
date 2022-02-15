import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import host from './host';
import options from './options';
import interval from './interval';
import accounts from './accounts2';
import currencies from './currencies';
import transaction from './transaction';
import assetImages from './assetImages';

const rootReducer = combineReducers({
  user,
  host,
  options,
  interval,
  accounts,
  currencies,
  transaction,
  assetImages,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
