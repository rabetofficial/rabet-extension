import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState } from 'react';

import handleAssetImage from '../../../utils/handleAssetImage';

import styles from './styles.less';

const SearchAsset = ({ currencies, closeModal, onChange }) => {
  const [searchString, setSearchString] = useState('');

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const filteredCurrencies = currencies.filter((x) => (new RegExp(searchString, 'i')).test(x.asset_code));

  const handleClick = (asset) => {
    onChange(asset);
    closeModal();
  };

  return (
    <div>
      <input
        type="text"
        value={searchString}
        onChange={(e) => handleChange(e)}
        placeholder="&#xe915;  Search assets"
        className={styles.search}
      />
      <div className={classNames(styles.list, 'hidden-scroll')}>
        {filteredCurrencies.map((currency, index) => (
          <div className={styles.listItem} key={index} onClick={() => { handleClick(currency); }}>
            <div className={styles.asset}>
              <img src={handleAssetImage(currency)} alt={currency.asset_code} />
              <div>
                <div className={styles.assetName}>{currency.asset_code.toUpperCase()}</div>
                <div className={styles.assetInfo}>{currency.domain}</div>
              </div>
            </div>
            <div className={styles.assetPrice}>{currency.balance}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchAsset.propTypes = {
  currencies: PropTypes.array.isRequired,
};

export default SearchAsset;
