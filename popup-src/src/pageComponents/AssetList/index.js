import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import config from 'Root/config';
import * as route from 'Root/staticRes/routes';
import showBalance from 'Root/helpers/showBalance';
import formatCurrency from 'Root/helpers/formatCurrency';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAssetsImages from 'Root/helpers/server/getAssetsImages';
import numberWithCommas from 'Root/helpers/numberWithCommas';

import stellar from 'Root/assets/images/stellar.png';
import checkedSrc from 'Root/assets/images/checked.svg';
import questionCircle from 'Root/assets/images/question-circle.png';

import styles from './styles.less';

class AssetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
    };

    this.handleAssetImage = this.handleAssetImage.bind(this);
    this.isAssetVerified = this.isAssetVerified.bind(this);
  }

  handleAssetImage(item) {
    if (item.asset_type === 'native') {
      return stellar;
    }

    const assetImage = this.state.assets.find(x => 
      x.asset_code === item.asset_code && x.asset_issuer === item.asset_issuer,
    );

    if (assetImage && assetImage.logo) {
      return assetImage.logo;
    }

    return questionCircle;
  }

  isAssetVerified(item) {
    if (item.asset_type === 'native') {
      return true;
    }

    const assetImage = this.state.assets.find(x => 
      x.asset_code === item.asset_code && x.asset_issuer === item.asset_issuer,
    );

    if (!assetImage) {
      return false
    }

    return assetImage.is_verified == '1';
  }

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();
    const { balances } = activeAccount;

    getAssetsImages(balances).then((assets) => {
      this.setState({
        assets,
      });
    });
  }

  render() {
    const { items, maxHeight, options, currencies } = this.props;

    const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

    return (
      <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
        <Link to={route.addAssetPage} className={styles.addAsset}>
          + Add asset
        </Link>
        {items.map((item, index) => {
          const value = item.asset_type === 'native' ? Number.parseFloat(item.balance, 10) * activeCurrency.value
          : (1 / Number.parseFloat(item.toNative, 10)) * activeCurrency.value * Number.parseFloat(item.balance, 10)

          return (
            <li key={shortid.generate()} style={{ marginTop: index === 0 && '-18px' }} className={styles.listItem}>
            <Link
              to={
                item.asset_code === 'XLM'
                  ? route.xlmAssetPage
                  : `${route.assetsPage}/${item.asset_code}/${item.asset_issuer}`
              }
              key={shortid.generate()}
            >
              <div
                className={styles.border}
                style={{ borderBottom: !(index === items.length - 1) && '1px solid #f8f8f8' }}
              >
                <div className={styles.logoContainer}>
                  <img src={this.handleAssetImage(item)} alt="logo" />
                </div>

                <div style={{ marginLeft: '6px' }}>
                  <div className="pure-g">
                    <div className={styles.value}>{numberWithCommas(formatCurrency(item.balance))}</div>
                    <div className={styles.currency}>{item.asset_code}</div>
                    {this.isAssetVerified(item)
                      ? <img src={checkedSrc} className={styles.checked} alt="icon" />
                      : ''
                    }
                  </div>
                  <div className={styles.cost}>
                    {showBalance(numberWithCommas(formatCurrency(value)), activeCurrency.name)}
                  </div>
                </div>
              </div>
            </Link>
          </li>
          )})}
          {!items.length
            ? (
              <li key={shortid.generate()} style={{ marginTop: '-18px' }} className={styles.listItem}>
                <Link
                  to={route.xlmAssetPage}
                  key={shortid.generate()}
                >
                  <div
                    className={styles.border}
                  >
                    <div className={styles.logoContainer}>
                      <img src={stellar} alt="logo" />
                    </div>
    
                    <div style={{ marginLeft: '6px' }}>
                      <div className="pure-g">
                        <div className={styles.value}>0</div>
                        <div className={styles.currency}>XLM</div>
                        <img src={checkedSrc} className={styles.checked} alt="icon" />
                      </div>
                      <div className={styles.cost}>
                        {showBalance(0, activeCurrency.name)}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
            : ''
          }
      </ul>
    );
  }
}

AssetList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
};

export default connect((state) => ({
  options: state.options,
  currencies: state.currencies,
}))(AssetList);
