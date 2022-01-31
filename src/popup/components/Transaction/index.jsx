import moment from 'moment';
import React, { useState } from 'react';

import useActiveAcconut from '../../hooks/useActiveAccount';
import useOperationDetails from '../../hooks/useOperationDetails';
import createTab from '../../utils/createTab';
import explorer from '../../utils/horizon/getTransaction';

import styles from './styles.less';

const Transaction = ({ item, index, operationList, transactionList }) => {
  const [isHover, setHover] = useState(false);
  const toggleHover = () => setHover(!isHover);
  const activeAccount = useActiveAcconut();

  const { operation_count } = transactionList.find(
    (x) => x.id === item.transaction_hash,
  );

  const [logo, logoWidth, description] = useOperationDetails(
    item,
    operation_count,
    activeAccount,
  );

  return (
    <li
      onClick={() => {
        createTab(explorer(item.transaction_hash));
      }}
      className={styles.listItem}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      style={{
        borderBottom:
          !(index === operationList.length - 1) && '1px solid #f8f8f8',
      }}
    >
      <div className={styles.box}>
        <div className={styles.logoContainer}>
          <img src={logo} width={logoWidth} alt="OP" />
        </div>
        <div className={styles.div}>
          <h6 className={styles.subject}>{description}</h6>
          <p className={styles.value}>
            {moment(item.created_at).format('MMM D')}
          </p>
        </div>
        {isHover && (
          <div className={styles.next}>
            <span className="icon-long-arrow-right" />
          </div>
        )}
      </div>
    </li>
  );
};

export default Transaction;