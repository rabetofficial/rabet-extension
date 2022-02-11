import shortid from 'shortid';

import store from 'popup/store';
import { addOperation } from 'popup/reducers/transaction';

export default async (id = shortid.generate()) => {
  const operation = {
    type: 'payment',
    id,
  };

  store.dispatch(addOperation(operation));
};
