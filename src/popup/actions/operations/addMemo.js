import types from '../index';
import store from '../../store';

export default (memo) => {
  store.dispatch({
    type: types.transaction.ADD_MEMO,
    memo,
  });
};
