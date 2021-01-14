import moment from 'moment';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

import createTab from 'Root/helpers/createTab';
import explorer from 'Root/helpers/horizon/getTransaction';
import operationDetails from 'Root/helpers/operationDetails';
import currentActiveAccount from 'Root/helpers/activeAccount';

import styles from './styles.less';

const Item = ({items, item, index}) =>  {
  const [isHover, setHover] = useState(false);
  const toggleHover = () => setHover(!isHover);

  const { activeAccount } = currentActiveAccount();
  const { transactions } = activeAccount;

  console.log(activeAccount);
  const operationCount = transactions.find(x => x.id === item.transaction_hash).operation_count;

  return (
      <li
        onClick={() => { createTab(explorer(item.transaction_hash)) }}
        className={ styles.listItem }
        onMouseEnter={ toggleHover } onMouseLeave={ toggleHover }
      >
        <div className={ styles.border } style={ {borderBottom: !(index === (items.length - 1 )) && '1px solid #f8f8f8'} }>
          <div className={ styles.logoContainer }><span className="icon-exchange-alt" /></div>
          <div className={ styles.div }>
            {/*<h6 className={ styles.subject }>{shorter(item.id, 10)}</h6>*/}
            <h6 className={ styles.subject }>
              {operationDetails(item).slice(0, 20)}...
            </h6>
            <p className={ styles.value }>{moment(item.created_at).fromNow()}</p>
          </div>
          <div className={ styles.div } style={ {marginLeft: 'auto', paddingRight: '33px'} }>
            <h6 className={ styles.subject }>{operationCount}</h6>
            <p className={ styles.value }>ops</p>
          </div>
          {isHover && <div className={ styles.next }><span className="icon-long-arrow-right" /></div>}
        </div>
      </li>
  );
};

const TransactionList = ({ items, maxHeight }) => {
  return (
      <>
        {items && items.length > 0 ?
            <ul className={ classNames(styles.list, 'hidden-scroll') } style={ {maxHeight: `${maxHeight}px`} }>
              {items.map((item, index) => (
                  <Fragment key={ index }>
                    <Item item={ item } index={ index } items={ items } />
                  </Fragment>
              ))
              }
            </ul> : <div className={styles.noData}>You have no transaction</div>
        }
        </>
  );
};

TransactionList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired
};

export default TransactionList;
