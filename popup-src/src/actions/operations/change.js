import store from 'Root/store';
import types from 'Root/actions';

export default async (id, values) => {
  store.dispatch({
    type: types.transaction.CHANGE_OP,
    id,
    values,
  });
};
