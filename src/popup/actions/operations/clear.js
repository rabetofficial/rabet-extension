import types from '../index';
import store from '../../store';

export default () => {
  store.dispatch({
    type: types.transaction.CLEAR_OP,
  });

  store.dispatch({
    type: types.transaction.CLEAR_MEMO,
  });
};
