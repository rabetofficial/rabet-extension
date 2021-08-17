import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Asset from '../../components/Asset';
import config from 'Root/config';
import * as route from 'Root/staticRes/routes';
import showBalance from 'Root/helpers/showBalance';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAssetsImages from 'Root/helpers/server/getAssetsImages';

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

    const inactiveNative = {
      asset_code: "XLM",
      asset_type: "native",
      balance: "0",
      buying_liabilities: "0.0000000",
      selling_liabilities: "0.0000000",
      toNative: "0",
    };

    return (
      <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
        <Link to={route.addAssetPage} className={styles.addAsset}>
          + Add asset
        </Link>
        {items.map((item, index) => (
          <Asset
            key={shortid.generate()}
            item={item}
            index={index}
            activeCurrency={activeCurrency}
            itemsLength={items.length}
            assets={this.state.assets}
          />
        ))}

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
