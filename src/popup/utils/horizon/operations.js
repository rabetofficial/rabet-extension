// import fetch from 'node-fetch';

import currentNetwork from '../currentNetwork';

const firstOperation = async (tx) => {
  try {
    const operationDetail = await fetch(
      `${currentNetwork().url}/transactions/${tx}/operations`,
    ).then((res) => res.json());

    if (operationDetail.status) {
      return false;
    }

    return operationDetail._embedded.records[0];
  } catch (e) {
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
