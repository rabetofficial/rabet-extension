import shortid from 'shortid';

import { addOperation } from 'popup/reducers/transaction';

export default async (id = shortid.generate()) => {
  const operation = {
    type: 'payment',
    id,
  };

  addOperation(operation);
};
