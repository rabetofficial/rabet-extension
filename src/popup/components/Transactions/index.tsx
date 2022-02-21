import React, { useEffect, useState } from 'react';
import { ServerApi } from 'stellar-sdk';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import loadTransactions from 'popup/features/loadTransactions';

import Transaction from './Transaction';

const Transactions = () => {
  const { publicKey } = useActiveAccount();
  const [transactions, setTransactions] = useState<
    ServerApi.CollectionPage<ServerApi.OperationRecord>[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTransactions(publicKey).then((txs) => {
      setTransactions(txs);
      setIsLoading(false);
    });
  }, [publicKey]);

  if (isLoading) {
    return <p>LOADING....</p>;
  }

  return (
    <div>
      {transactions.map((tx) => (
        <div key={tx.records[0].transaction_hash}>
          <Transaction transaction={tx} publicKey={publicKey} />
        </div>
      )}
    </div>
  );
};

export default Transactions;
