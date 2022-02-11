import store from 'popup/store';
import { addMemo } from 'popup/reducers/transaction';

export default (memo) => {
  store.dispatch(addMemo(memo));
};
