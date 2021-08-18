import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Asset from '../../components/Asset';
import * as route from '../../staticRes/routes';
import currentActiveAccount from '../../helpers/activeAccount';
import getAssetsImages from '../../helpers/server/getAssetsImages';

import styles from './styles.less';

class AssetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: [],
    };
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
    const {
      items,
      maxHeight,
      options,
      currencies,
    } = this.props;

    const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

    const inactiveNative = {
      asset_code: 'XLM',
      asset_type: 'native',
      balance: '0',
      buying_liabilities: '0.0000000',
      selling_liabilities: '0.0000000',
      toNative: '0',
    };

    const { assets } = this.state;

    return (
      <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
        <Link to={route.addAssetPage} className={styles.addAsset}>
          + Add asset
        </Link>
        {items.map((item, index) => (
          <Asset
            key={item.asset_issuer + ':' + item.asset_code}
            item={item}
            index={index}
            activeCurrency={activeCurrency}
            itemsLength={items.length}
            assets={assets}
          />
        ))}

        {!items.length && (
          <Asset
            key={shortid.generate()}
            item={inactiveNative}
            index={0}
            activeCurrency={activeCurrency}
            itemsLength={1}
            assets={[inactiveNative]}
          />
        )}
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
