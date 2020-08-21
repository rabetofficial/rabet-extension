import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.less';

const AssetList = ({items, maxHeight}) => {
  return (
      <ul className={ classNames(styles.list, 'scroll') } style={ {maxHeight: `${maxHeight}px`} }>
        <a href="/" className={ styles.addAsset }>+ Add assets</a>
        {items.map((item, index) => (
            <li
              className={ styles.listItem }
              key={ index }
              style={ { marginTop: (index === 0) && '-18px' } }
            >
              <div className={ styles.border } style={ {borderBottom: !(index === (items.length - 1 )) && '1px solid #f8f8f8'} }>
              <div className={ styles.logoContainer }><img src={ item.logo } alt="logo"/></div>
               <div className={ styles.value }>{item.value}</div>
               <div className={ styles.currency }>{item.currency}</div>
              </div>
            </li>
        ))}
      </ul>
  );
};

AssetList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
};

export default AssetList;
