import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.less';
import handleAssetImage from '../../../utils/handleAssetImage';

const SearchAsset = ({ currencies }) => {
  const [searchString, setSearchString] = useState('');

  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  const filteredCurrencies = currencies.filter((x) => (new RegExp(searchString, 'i')).test(x.asset_code));

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
          <div className={styles.listItem} key={index}>
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
