import shortid from 'shortid';

import store from 'Root/store';
import types from 'Root/actions';

export default async (id = shortid.generate()) => {
  const operation = {
    type: 'payment',
    id,
  };

  store.dispatch({
    type: types.operations.ADD,
    operation,
  });
};
