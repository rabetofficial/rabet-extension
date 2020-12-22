import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, {Fragment, useState} from 'react';

import * as route from 'Root/staticRes/routes';
import formatCurrency from 'Root/helpers/formatCurrency';
import stellar from 'Root/assets/images/question-circle.png';
import getAssetsImages from 'Root/helpers/server/getAssetsImages';

import styles from './styles.less';

const AssetList = ({items, maxHeight, ...props}) => {
  return (
      <ul className={ classNames(styles.list, 'hidden-scroll') } style={ {maxHeight: `${maxHeight}px`} }>
        <Link to={route.addAssetPage} className={styles.addAsset}>+ Add asset</Link>
        {items.map((item, index) => (
            <li
                key={ index }
                style={ { marginTop: (index === 0) && '-18px' } }
                className={ styles.listItem }
            >
              <Link to={item.asset_code === 'XLM' ? route.xlmAssetPage :`${route.assetsPage}/${item.asset_code}`} key={shortid.generate()}>
                <div className={ styles.border } style={ {borderBottom: !(index === (items.length - 1 )) && '1px solid #f8f8f8'} }>
                  <div className={ styles.logoContainer }><img src={stellar} alt="logo"/></div>
                  <div style={ {marginLeft: '6px'} }>
                    <div className="pure-g">
                      <div className={ styles.value }>{formatCurrency(item.balance)}</div>
                      <div className={ styles.currency }>{item.asset_code}</div>
                    </div>
                    <div className={styles.cost}>
                      {item.toNative ? '$' : ''}{formatCurrency(props.options.usd * Number.parseFloat(item.toNative, 10) * Number.parseFloat(item.balance, 10)) || ''}
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

export default connect(state => ({
  options: state.options,
}))(AssetList);
