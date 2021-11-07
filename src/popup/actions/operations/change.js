import types from '../index';
import store from '../../store';

export default async (id, values) => {
  store.dispatch({
    type: types.transaction.CHANGE_OP,
    id,
    values,
  });
};
