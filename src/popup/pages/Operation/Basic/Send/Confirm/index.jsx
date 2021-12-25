import { useLocation, useNavigate } from 'react-router-dom';

import shorter from '../../../../../utils/shorter';
import Card from '../../../../../components/Card';
import Button from '../../../../../components/Button';
import PageTitle from '../../../../../components/PageTitle';
import currentActiveAccount from '../../../../../utils/activeAccount';
import { buttonSizes, buttonTypes } from '../../../../../staticRes/enum';
import basicSendAction from '../../../../../actions/operations/basicSend';

import styles from '../../confirm.less';
import handleAssetImage from '../../../../../utils/handleAssetImage';

const BasicSendConfirm = () => {
  const navigate = useNavigate();
  const { state: { values } } = useLocation();
  const { activeAccount } = currentActiveAccount();

  const handleClick = () => {
    basicSendAction(values, navigate);
  };

  return (
    <>
      <PageTitle status="success" statusTitle="Main network" />
      <div className="content">

        <div className={styles.account}>
          <div className={styles.accountTitle}>Source account:</div>
          <div className={styles.accountAddress}>{shorter(activeAccount.publicKey, 4)}</div>
        </div>

        <Card type="card-secondary">
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Confirm Send</h2>
            <div className={styles.label}>Amount</div>
            <div className={styles.value}>
              {values.amount}
              <img src={handleAssetImage(values.asset)} alt={values.asset.asset_code} />
              <span>{values.asset.asset_code}</span>
            </div>
            <hr className={styles.hr} />
            <div className={styles.label}>To</div>
            <div className={styles.value}>{shorter(values.destination, 4)}</div>
            <hr className={styles.hr} />
            {values.memo ? (
              <>
                <div className={styles.label}>Memo</div>
                <div className={styles.value}>{values.memo}</div>
              </>
            ) : ''}
          </div>
        </Card>

        <div className={styles.buttons}>
          <Button
            type="button"
            variant={buttonTypes.default}
            size={buttonSizes.medium}
            content="Cancel"
            onClick={() => { navigate(-1); }}
          />

          <Button
            type="button"
            variant={buttonTypes.primary}
            size={buttonSizes.medium}
            content="Confirm"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default BasicSendConfirm;
