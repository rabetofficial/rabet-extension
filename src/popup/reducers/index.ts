import { combineReducers } from '@reduxjs/toolkit';

import bids from './bids';
import user from './user';
import host from './host';
import modal from './modal';
import options from './options';
import interval from './interval';
import contacts from './contacts';
import accounts from './accounts2';
import currencies from './currencies';
import transaction from './transaction';
import assetImages from './assetImages';

const rootReducer = combineReducers({
  bids,
  user,
  host,
  modal,
  options,
  interval,
  contacts,
  accounts,
  currencies,
  transaction,
  assetImages,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
