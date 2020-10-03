import shortid from 'shortid';

import store from 'Root/store';
import types from 'Root/actions';

export default async () => {
  const operation = {
    type: 'payment',
    id: shortid.generate(),
  };

  store.dispatch({
    type: types.operations.ADD,
    operation,
  });
};
