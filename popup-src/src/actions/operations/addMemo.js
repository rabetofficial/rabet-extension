import store from 'Root/store';
import types from 'Root/actions';

export default (memo) => {
  store.dispatch({
    type: types.transaction.ADD_MEMO,
    memo,
  });
};
