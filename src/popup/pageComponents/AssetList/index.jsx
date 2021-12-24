import shortid from 'shortid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

import Asset from '../../components/Asset';
import * as route from '../../staticRes/routes';
import currentActiveAccount from '../../utils/activeAccount';
import getAssetsImages from '../../utils/server/getAssetsImages';
import loadAssetImagesAction from '../../actions/assetImages/load';

import styles from './styles.less';

const AssetList = ({
  items,
  maxHeight,
}) => {
  const [
    options,
    assets,
    currencies,
  ] = useSelector((store) => [store.options, store.assetImages, store.currencies]);

  useEffect(() => {
    const { activeAccount: { balances } } = currentActiveAccount();

    getAssetsImages(balances).then(loadAssetImagesAction);
  }, []);

  const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

  const inactiveNative = {
    asset_code: 'XLM',
    asset_type: 'native',
    balance: '0',
    buying_liabilities: '0.0000000',
    selling_liabilities: '0.0000000',
    toNative: '0',
  };

  return (
    <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
      <Link to={route.addAssetPage} className={styles.addAsset}>
        + Add asset
      </Link>

      {items.map((item, index) => (
        <Asset
          item={item}
          index={index}
          assets={assets}
          itemsLength={items.length}
          activeCurrency={activeCurrency}
          key={`${item.asset_issuer}:${item.asset_code}`}
        />
      ))}

      {!items.length && (
        <Asset
          index={0}
          itemsLength={1}
          item={inactiveNative}
          key={shortid.generate()}
          assets={[inactiveNative]}
          activeCurrency={activeCurrency}
        />
      )}
    </ul>
  );
};

AssetList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
};

export default AssetList;
