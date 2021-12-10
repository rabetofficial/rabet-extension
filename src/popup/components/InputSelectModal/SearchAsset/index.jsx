import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.less';

const SearchAsset = ({ currencies }) => {
  const [searchString, setSearchString] = useState('');
  const handleChange = (e) => {
    setSearchString(e.target.value);
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
        {currencies.map((currency, index) => (
          <div className={styles.listItem} key={index}>
            <div className={styles.asset}>
              <img src={currency.img} alt={currency.name} />
              <div>
                <div className={styles.assetName}>{currency.name.toUpperCase()}</div>
                <div className={styles.assetInfo}>{currency.info}</div>
              </div>
            </div>
            <div className={styles.assetPrice}>{currency.amount}</div>
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
