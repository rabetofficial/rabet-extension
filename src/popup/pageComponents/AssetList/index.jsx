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
    currencies,
  ] = useSelector((store) => [store.options, store.currencies]);

  const { activeAccount } = currentActiveAccount();
  const { balances } = activeAccount;

  useEffect(() => {
    getAssetsImages(balances).then((result) => {
      loadAssetImagesAction(result, activeAccount.publicKey);
    });
  }, []);

  const activeCurrency = currencies[options.currency] || { value: 0, currency: 'USD' };

  return (
    <ul className={classNames(styles.list, 'hidden-scroll')} style={{ maxHeight: `${maxHeight}px` }}>
      <Link to={route.addAssetPage} className={styles.addAsset}>
        + Add asset
      </Link>

      {items.map((item, index) => (
        <Asset
          item={item}
          index={index}
          assets={balances}
          itemsLength={items.length}
          activeCurrency={activeCurrency}
          key={`${item.asset_issuer}:${item.asset_code}`}
        />
      ))}
    </ul>
  );
};

AssetList.propTypes = {
  items: PropTypes.array.isRequired,
  maxHeight: PropTypes.number.isRequired,
};

export default AssetList;
