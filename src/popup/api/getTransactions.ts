import { Server } from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';

const getTransactions = async (publicKey: string) => {
  const serverURL = currentNetwork().url;

  const server = new Server(serverURL);

  try {
    const transactionsServer = await server
      .transactions()
      .forAccount(publicKey)
      .order('desc')
      .limit(10)
      .call();

    const transactions = transactionsServer.records;

    // Get operations of each transaction
    const operationsList = [];

    for (let i = 0; i < transactions.length; i += 1) {
      const operations = server
        .operations()
        .forTransaction(transactions[i].id)
        .limit(5)
        .call();

      operationsList.push(operations);
    }

    const operations = await Promise.all(operationsList);

    return operations;
  } catch (e) {
    return [];
  }
};

export default getTransactions;
