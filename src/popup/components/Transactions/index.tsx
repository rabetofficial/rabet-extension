import React, { useEffect, useState } from 'react';
import { ServerApi } from 'stellar-sdk';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import loadTransactions from 'popup/features/loadTransactions';

import Transaction from './Transaction';
import Loading from '../Loading';

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
    return (
      <Loading
        title="Loading Transactions"
        size={80}
        titleStyle="text-primary"
      />
    );
  }
  if (transactions.length === 0) {
    return (
      <p className="flex justify-center text-primary text-base mt-[135px]">
        You have no transaction
      </p>
    );
  }
  return (
    <div className="mt-[-13px] mx-[-20px]">
      {transactions.map((tx, index) => (
        <div key={tx.records[0].transaction_hash}>
          <Transaction transaction={tx} publicKey={publicKey} />
          {transactions.length !== index + 1 && (
            <hr className="bg-primary-lighter ml-[22px] mr-[19px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Transactions;
