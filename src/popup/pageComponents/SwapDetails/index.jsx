import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import angleRightIcon from '../../../assets/images/angle-right.svg';

import styles from './styles.less';

const SwapDetails = ({ path, price, received }) => (
  <>
    <div className={styles.box}>
      <div className={styles.boxTitle}>Path</div>
      <div className={styles.boxValue}>
        <div className={styles.path}>
          {path.map((p, index) => (
            <div key={index}>
              {p}
              {index !== (path.length - 1) && <img src={angleRightIcon} alt="icon" />}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className={styles.box}>
      <div className={styles.boxTitle}>Price impact</div>
      <div className={classNames(styles.boxValue, styles.upStatus)}>
        {price}
        %
      </div>
    </div>
    <div className={styles.box}>
      <div className={styles.boxTitle}>Minimum received</div>
      <div className={styles.boxValue}>
        {received}
        {' '}
        XLM
      </div>
    </div>
  </>
);

SwapDetails.propTypes = {
  path: PropTypes.array.isRequired,
  price: PropTypes.number.isRequired,
  received: PropTypes.number.isRequired,
};

export default SwapDetails;
