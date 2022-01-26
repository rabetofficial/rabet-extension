import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useWatch } from 'react-hook-form';
import { useState, useEffect } from 'react';

import BN from '../../../helpers/BN';
import formatCurrency from '../../utils/formatCurrency';
import angleRightIcon from '../../../assets/images/angle-right.svg';
import calculatePriceImpact from '../../utils/swap/calculatePriceImpact';

import styles from './styles.less';

const SwapDetails = ({
  path,
  values,
  control,
  minimumReceived,
}) => {
  const [marketPrice, setMarketPrice] = useState(0);

  let formValues = values;

  if (control) {
    formValues = useWatch({ control });
  }

  useEffect(() => {
    calculatePriceImpact(formValues.asset1, formValues.asset2)
      .then((result) => {
        setMarketPrice(result);
      });
  }, [formValues]);

  const priceImpact = new BN(1)
    .minus(new BN(minimumReceived).div(new BN(marketPrice).times(formValues.from)))
    .times(100);

  let finalPriceImpact = priceImpact.toFixed(2);

  if (priceImpact.isNaN() || !priceImpact.isFinite()) {
    finalPriceImpact = new BN(0);
  }

  if (priceImpact.isLessThan(0)) {
    finalPriceImpact = new BN(0);
  }

  if (priceImpact.isLessThan(0.1)) {
    finalPriceImpact = '0.01>';
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.boxTitle}>Path</div>
        <div className={styles.boxValue}>
          <div className={styles.path}>
            {path.map((p, index) => (
              <div key={p.asset_code}>
                {p.asset_type === 'native' ? 'XLM' : p.asset_code}
                {index !== (path.length - 1) && <img src={angleRightIcon} alt="icon" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxTitle}>Price impact</div>
        <div className={classNames(styles.boxValue, styles.upStatus)}>
          {finalPriceImpact.toString()}
          %
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxTitle}>Minimum received</div>
        <div className={styles.boxValue}>
          {formatCurrency(minimumReceived)}
          {' '}
          {formValues.asset2.asset_code}
        </div>
      </div>
    </>
  );
};

SwapDetails.propTypes = {
  path: PropTypes.array.isRequired,
  minimumReceived: PropTypes.string.isRequired,
};

export default SwapDetails;
