import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const Item = ({items, item, index}) =>  {
  const [isHover, setHover] = useState(false);
  const toggleHover = () => setHover(!isHover);
  return (
      <li
        className={ styles.listItem }
        onMouseEnter={ toggleHover } onMouseLeave={ toggleHover }
      >
        <div className={ styles.border } style={ {borderBottom: !(index === (items.length - 1 )) && '1px solid #f8f8f8'} }>
          <div className={ styles.logoContainer }><span className="icon-exchange-alt" /></div>
          <div className={ styles.div }>
            <h6 className={ styles.subject }>{item.address}</h6>
            <p className={ styles.value }>{item.time}</p>
          </div>
          <div className={ styles.div } style={ {marginLeft: '59px'} }>
            <h6 className={ styles.subject }>{item.ops}</h6>
            <p className={ styles.value }>ops</p>
          </div>
          {isHover && <div className={ styles.next }><span className="icon-long-arrow-right" /></div>}
        </div>
      </li>
  );
};

const TransactionList = ({items, maxHeight}) => {
  return (
      <ul className={ classNames(styles.list, 'scroll') } style={ {maxHeight: `${maxHeight}px`} }>
        {items.map((item, index) => (
            <Fragment key={ index }>
              <Item item={ item } index={ index } items={ items }/>
            </Fragment>
        ))
        }
      </ul>
  );
};

TransactionList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired
};

export default TransactionList;
