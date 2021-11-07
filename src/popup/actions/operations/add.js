import shortid from 'shortid';

import types from '../index';
import store from '../../store';

export default async (id = shortid.generate()) => {
  const operation = {
    type: 'payment',
    id,
  };

  store.dispatch({
    type: types.transaction.ADD_OP,
    operation,
  });
};
