import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import BN from '../../../helpers/BN';
import angleRightIcon from '../../../assets/images/angle-right.svg';
import calculatePriceImpact from '../../utils/swap/calculatePriceImpact';

import styles from './styles.less';

const SwapDetails = ({
  path,
  received,
  asset1,
  asset2,
  form,
}) => {
  const [marketPrice, setMarketPrice] = useState(0);
  const { values } = form.getState();

  useEffect(() => {
    calculatePriceImpact(asset1, asset2)
      .then((result) => {
        setMarketPrice(result);
      });
  }, [
    asset1.asset_code + asset1.asset_issuer,
    asset2.asset_code + asset2.asset_issuer,
  ]);

  const priceImpact = new BN(1)
    .minus(new BN(received.minimumReceived).div(new BN(marketPrice).times(values.from)))
    .times(100);

  let finalPriceImpact = priceImpact;

  if (priceImpact.isNaN() || !priceImpact.isFinite()) {
    finalPriceImpact = new BN('0');
  }

  if (finalPriceImpact.isLessThan(0)) {
    finalPriceImpact = new BN(0);
  }

  return (
    <>
      <div className={styles.box}>
        <div className={styles.boxTitle}>Path</div>
        <div className={styles.boxValue}>
          <div className={styles.path}>
            {path.map((p, index) => (
              <div key={index}>
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
          {received.minimumReceived}
          {' '}
          {received.asset.asset_code}
        </div>
      </div>
    </>
  );
};

SwapDetails.propTypes = {
  path: PropTypes.array.isRequired,
  received: PropTypes.object.isRequired,
};

export default SwapDetails;
