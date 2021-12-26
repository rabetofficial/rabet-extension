import { useNavigate, useLocation } from 'react-router-dom';

import Card from '../../../../../components/Card';
import ConfirmLayout from '../../../../../components/ConfirmLayout';
import SwapDetails from '../../../../../pageComponents/SwapDetails';
import arrowIconSrc from '../../../../../../assets/images/arrow-down.svg';
import basicSwapAction from '../../../../../actions/operations/basicSwap';
import sampleLogoSrc from '../../../../../../assets/images/question-circle.png';

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
            130
            <img src={sampleLogoSrc} alt="lsp" />
            <span>LSP</span>
          </div>

          <img src={arrowIconSrc} className={styles.connector} alt="icon" />

          <div className={styles.label}>To</div>
          <div className={styles.value}>
            13
            <img src={sampleLogoSrc} alt="lsp" />
            <span>USDC</span>
          </div>

          <hr className={styles.hr} />

          <SwapDetails price={1} received={123.5} path={[]} />
        </div>
      </Card>
    </ConfirmLayout>
  );
};

BasicSwapConfirm.propTypes = {

};

export default BasicSwapConfirm;
