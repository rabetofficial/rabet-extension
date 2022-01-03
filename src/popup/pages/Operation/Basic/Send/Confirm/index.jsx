import { useLocation, useNavigate } from 'react-router-dom';

import Card from '../../../../../components/Card';
import shorter from '../../../../../utils/shorter';
import CopyText from '../../../../../components/CopyText';
import ConfirmLayout from '../../../../../components/ConfirmLayout';
import handleAssetImage from '../../../../../utils/handleAssetImage';
import numberWithCommas from '../../../../../utils/numberWithCommas';
import basicSendAction from '../../../../../actions/operations/basicSend';
import styles from '../../../../../components/ConfirmLayout/styles.less';

const BasicSendConfirm = () => {
  const navigate = useNavigate();
  const { state: { values } } = useLocation();

  const handleClick = () => {
    basicSendAction(values, navigate);
  };

  return (
    <ConfirmLayout
      handleClick={handleClick}
    >
      <Card type="card-secondary">
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Confirm Send</h2>
          <div className={styles.label}>Amount</div>
          <div className={styles.value}>
            {numberWithCommas(values.amount)}
            <img src={handleAssetImage(values.asset)} alt={values.asset.asset_code} />
            <span>{values.asset.asset_code}</span>
          </div>
          <hr className={styles.hr} />
          <div className={styles.label}>To</div>
          <div className={styles.value}>
            <CopyText
              text={values.destination}
              button={shorter(values.destination, 4)}
            />
          </div>
          <hr className={styles.hr} />
          {values.memo ? (
            <>
              <div className={styles.label}>Memo</div>
              <div className={styles.value}>{values.memo}</div>
            </>
          ) : ''}
        </div>
      </Card>
    </ConfirmLayout>
  );
};

export default BasicSendConfirm;
