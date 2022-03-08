import styled from 'styled-components';
import { ServerApi } from 'stellar-sdk';
import React, { useEffect, useState } from 'react';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import loadTransactions from 'popup/features/loadTransactions';

import Loading from '../Loading';
import Nodata from '../common/Nodata';
import Transaction from './Transaction';
import ScrollBar from '../common/ScrollBar';

type TransactionsType = {
  scrollMaxHeight?: number;
  isExtention?: boolean;
};

const Transactions = ({
  scrollMaxHeight,
  isExtention,
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
      <ScrollBar isHidden maxHeight={isExtention ? 199 : 600}>
        <div
          className="flex justify-center items-center"
          style={{ height: isExtention ? '200px' : '60vh' }}
        >
          <Loading size={80} />
        </div>
      </ScrollBar>
    );
  }
  if (transactions.length === 0) {
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: isExtention ? '198px' : '60vh' }}
      >
        <Nodata msg="You have no transaction" className="text-base" />
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
  margin: -24px -20px 0px;
  @media (max-width: 360px) {
    margin-top: 0px;
  }
`;

Transactions.defaultProps = {
  scrollMaxHeight: 600,
  isExtention: false,
};
export default Transactions;
