import store from 'Root/store';
import types from 'Root/actions';

export default async (id, values) => {
  store.dispatch({
    type: types.operations.CHANGE,
    id,
    values,
  });
};
