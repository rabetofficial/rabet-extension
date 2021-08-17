import types from '../index';
import store from '../../store';

export default async (id) => {
  store.dispatch({
    type: types.transaction.REMOVE_OP,
    id,
  });
};
