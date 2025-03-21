import styled from 'styled-components';
import { ServerApi } from '@stellar/stellar-sdk';
import React, { useEffect, useState } from 'react';

import { Usage } from 'popup/models';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import loadTransactions from 'popup/features/loadTransactions';

import Loading from '../Loading';
import Nodata from '../common/Nodata';
import Transaction from './Transaction';
import ScrollBar from '../common/ScrollBar';

type TransactionsType = {
  scrollMaxHeight?: number;
  usage: Usage;
};

const Transactions = ({
  scrollMaxHeight,
  usage,
}: TransactionsType) => {
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
      <ScrollBar
        isHidden
        maxHeight={usage === 'extension' ? 278 : 600}
      >
        {usage === 'extension' ? (
          <div className="flex justify-center items-center h-[278px]">
            <Loading size={60} />
          </div>
        ) : (
          <div className="flex justify-center items-center mt-[180px]">
            <Loading size={80} />
          </div>
        )}
      </ScrollBar>
    );
  }
  if (!transactions.length) {
    return (
      <div style={{ marginTop: usage === 'extension' ? '31' : '72' }}>
        <Nodata
          msg="You have no transactions"
          className="text-base"
        />
      </div>
    );
  }
  return (
    <ContentContainer>
      <ScrollBar isHidden maxHeight={scrollMaxHeight}>
        {transactions.map((tx, index) => (
          <div key={tx.records[0].transaction_hash}>
            <Transaction transaction={tx} publicKey={publicKey} />

            {transactions.length !== index + 1 && (
              <hr className="bg-primary-lighter ml-[22px] mr-[19px]" />
            )}
          </div>
        ))}
      </ScrollBar>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  margin: -24px -20px;
  @media (max-width: 360px) {
    margin: 0px -16px;
  }
`;

Transactions.defaultProps = {
  scrollMaxHeight: 600,
};
export default Transactions;
