import store from 'popup/store';
import {
  clearMemo,
  clearOperations,
} from 'popup/reducers/transaction';

export default () => {
  store.dispatch(clearMemo());
  store.dispatch(clearOperations());
};
