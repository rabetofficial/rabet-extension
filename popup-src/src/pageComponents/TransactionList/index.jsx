import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Fragment, useState, useEffect } from 'react';

import Loading from '../../components/Loading';
import createTab from '../../helpers/createTab';
import explorer from '../../helpers/horizon/getTransaction';
import getOperations from '../../helpers/horizon/operations';
import operationDetails from '../../helpers/operationDetails';
import currentActiveAccount from '../../helpers/activeAccount';
import getTransactions from '../../helpers/horizon/transactions';

import styles from './styles.less';

const Item = ({
  item,
  index,
  operationList,
  transactionList,
}) => {
  const [isHover, setHover] = useState(false);
  const toggleHover = () => setHover(!isHover);

  const { operation_count } = transactionList.find((x) => x.id === item.transaction_hash);

  return (
    <li
      onClick={() => { createTab(explorer(item.transaction_hash)); }}
      className={styles.listItem}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={styles.border} style={{ borderBottom: !(index === (operationList.length - 1)) && '1px solid #f8f8f8' }}>
        <div className={styles.logoContainer}>
          <span className="icon-exchange-alt" />
        </div>
        <div className={styles.div}>
          <h6 className={styles.subject}>
            {operationDetails(item).slice(0, 20)}
            ...
          </h6>
          <p className={styles.value}>{moment(item.created_at).fromNow()}</p>
        </div>
        <div className={styles.div} style={{ marginLeft: 'auto', paddingRight: '33px' }}>
          <h6 className={styles.subject}>{operation_count}</h6>
          <p className={styles.value}>ops</p>
        </div>
        {isHover && <div className={styles.next}><span className="icon-long-arrow-right" /></div>}
      </div>
    </li>
  );
};

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
    return (
      <div className={styles.loadingContainer}>
        <Loading size={55} />
      </div>
    );
  }

  return (
    <>
      {operationList && operationList.length > 0 ? (
        <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
          {operationList.map((item, index) => (
            <Item
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
