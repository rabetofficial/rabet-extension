import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Fragment, useState, useEffect } from 'react';

import Loading from '../../components/Loading';
import Transaction from '../../components/Transaction';
import getOperations from '../../utils/horizon/operations';
import currentActiveAccount from '../../utils/activeAccount';
import getTransactions from '../../utils/horizon/transactions';

import styles from './styles.less';

const TransactionList = ({ maxHeight }) => {
  const { activeAccount } = currentActiveAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [operationList, setOperationList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  useEffect(() => {
    (async () => {
      if (isLoading) {
        const transactions = await getTransactions(activeAccount.publicKey);
        const operations = await getOperations(transactions);

        setOperationList(operations);
        setTransactionList(transactions);
        setIsLoading(false);
      }
    })();
  });

  if (isLoading) {
    return <div className={styles.loading}><Loading size={56} /></div>;
  }

  return (
    <>
      {operationList && operationList.length > 0 ? (
        <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
          {operationList.map((item, index) => (
            <Transaction
              key={item.id}
              item={item}
              index={index}
              operationList={operationList}
              transactionList={transactionList}
            />
          ))}
        </ul>
      )
        : (
          <div className={styles.noData}>You have no transaction</div>
        )}
    </>
  );
};

TransactionList.propTypes = {
  maxHeight: PropTypes.number.isRequired,
};

export default TransactionList;
