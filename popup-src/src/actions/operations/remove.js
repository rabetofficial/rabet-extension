import store from 'Root/store';
import types from 'Root/actions';

export default async (id) => {
  store.dispatch({
    type: types.transaction.REMOVE_OP,
    id,
  });
};
