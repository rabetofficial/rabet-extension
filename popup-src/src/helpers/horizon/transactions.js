import fetch from 'node-fetch';

import currentNetwork from './currentNetwork';

export default async (account) => new Promise((resolve, reject) => {
  try {
    fetch(`${currentNetwork().url}/accounts/${account}/transactions?limit=10&order=desc`)
    .then(res => res.json())
    .then(data => {
      const transactions = [];

      for (const transaction of data._embedded.records) {
        transactions.push({
          id: transaction.id,
          created_at: transaction.created_at,
          operation_count: transaction.operation_count,
        });
      }

      resolve(transactions);
    });
  } catch (e) {
    resolve([]);
  }
});
