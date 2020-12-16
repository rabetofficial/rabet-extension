import fetch from 'node-fetch';

import config from 'Root/config';

const firstOperation = async (tx) => {
  try {
    const operationDetail = await fetch(`${config.HORIZON.mainnet}/transactions/${tx}/operations`)
      .then(res => res.json());

    if (operationDetail.status) {
      return false;
    }

    return operationDetail._embedded.records[0];
  } catch(e) {
    return false;
  }
};

export default async (txns) => {
  const promises = [];

  for (const tx of txns) {
    promises.push(firstOperation(tx.id));
  }

  const operations = await Promise.all(promises);

  return operations;
};
