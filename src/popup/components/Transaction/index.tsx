import moment from 'moment';
import { useState } from 'react';

import useActiveAcconut from '../../hooks/useActiveAccount';
import createTab from '../../utils/createTab';
import explorer from '../../utils/horizon/getTransaction';

import styles from './styles.less';

const Transaction = ({
  item,
  index,
  operationList,
  transactionList,
}) => {
  const activeAccount = useActiveAcconut();
  const [isHover, setHover] = useState(false);
  const toggleHover = () => setHover(!isHover);

  const { operation_count } = transactionList.find((x) => x.id === item.transaction_hash);

  const handleOperations = (item) => {
    if (operation_count > 1) {
      return ['multi', 'Multi operations'];
    }

    if (item.type === 'path_payment_strict_send') {
      return [
        'swap',
        `Swap ${item.amount} ${item.asset_code || 'XLM'} -> ${item.source_amount} {item.source_asset_code}`
      ];
    }

    if (item.type === 'create_account') {
      return ['send', `Send ${item.starting_balance} XLM`];
    }

    if (item.type === 'payment' && item.from === activeAccount.publicKey) {
      return ['send', `Send ${item.amount} ${item.asset_code || 'XLM'}`];
    }

    if (item.type === 'payment' && item.from !== activeAccount.publicKey) {
      return ['receive', `Receive ${item.amount} ${item.asset_code || 'XLM'}`];
    }

    if (item.type === 'manage_data') {
      return ['manage_data', 'Manage Data'];
    }

    return ['op', 'Operation'];
  };

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
            {handleOperations(item)[1]}
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

export default Transaction;
