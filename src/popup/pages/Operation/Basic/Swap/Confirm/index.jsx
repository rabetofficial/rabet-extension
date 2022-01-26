import { useNavigate, useLocation } from 'react-router-dom';

import Card from '../../../../../components/Card';
import ConfirmLayout from '../../../../../components/ConfirmLayout';
import SwapDetails from '../../../../../pageComponents/SwapDetails';
import handleAssetImage from '../../../../../utils/handleAssetImage';
import numberWithCommas from '../../../../../utils/numberWithCommas';
import arrowIconSrc from '../../../../../../assets/images/arrow-down.svg';
import basicSwapAction from '../../../../../actions/operations/basicSwap';

import styles from '../../../../../components/ConfirmLayout/styles.less';

const BasicSwapConfirm = () => {
  const navigate = useNavigate();
  const { state: { values } } = useLocation();

  const handleClick = () => {
    basicSwapAction(values, navigate);
  };

  return (
    <ConfirmLayout
      handleClick={handleClick}
    >
      <Card type="card-secondary">
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Confirm Swap</h2>
          <div className={styles.label}>From</div>
          <div className={styles.value}>
            {numberWithCommas(values.from)}
            <img src={handleAssetImage(values.asset1)} alt={values.asset1.asset_code} />
            <span>{values.asset1.asset_code}</span>
          </div>

          <img src={arrowIconSrc} className={styles.connector} alt="icon" />

          <div className={styles.label}>To</div>
          <div className={styles.value}>
            {numberWithCommas(values.to)}
            <img src={handleAssetImage(values.asset2)} alt={values.asset2.asset_code} />
            <span>{values.asset2.asset_code}</span>
          </div>

          <hr className={styles.hr} />

          <SwapDetails
            values={values}
            path={values.path}
            minimumReceived={values.minimumReceived}
          />
        </div>
      </Card>
    </ConfirmLayout>
  );
};

BasicSwapConfirm.propTypes = {

};

export default BasicSwapConfirm;
