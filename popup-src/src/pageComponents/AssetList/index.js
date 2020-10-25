import React, {Fragment, useState} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as route from 'Root/staticRes/routes';
import stellar from 'Root/assets/images/stellar.png';
import formatCurrency from 'Root/helpers/formatCurrency';

import styles from './styles.less';

const AssetList = ({items, maxHeight}) => {

  return (
      <ul className={ classNames(styles.list, 'hidden-scroll') } style={ {maxHeight: `${maxHeight}px`} }>
        <Link to={route.addAssetPage} className={styles.addAsset}>+ Add assets</Link>
        {items.map((item, index) => (
            <li
                key={ index }
                style={ { marginTop: (index === 0) && '-18px' } }
                className={ styles.listItem }
            >
              <Link to={`${route.assetsPage}/${item.asset_code}`} key={shortid.generate()}>
                <div className={ styles.border } style={ {borderBottom: !(index === (items.length - 1 )) && '1px solid #f8f8f8'} }>
                  <div className={ styles.logoContainer }><img src={stellar} alt="logo"/></div>
                  <div style={ {marginLeft: '6px'} }>
                    <div className="pure-g">
                      <div className={ styles.value }>{formatCurrency(item.balance)}</div>
                      <div className={ styles.currency }>{item.asset_code}</div>
                    </div>
                    <div className={styles.cost}>
                      $194,000
                    </div>
                  </div>
                </div>
              </Link>
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
