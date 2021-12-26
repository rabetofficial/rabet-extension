import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import CopyText from '../CopyText';
import PageTitle from '../PageTitle';
import shorter from '../../utils/shorter';
import currentActiveAccount from '../../utils/activeAccount';
import { buttonSizes, buttonTypes } from '../../staticRes/enum';

import styles from './styles.less';

const ConfirmLayout = ({ children, handleClick }) => {
  const navigate = useNavigate();
  const { activeAccount } = currentActiveAccount();
  const { network } = useSelector((store) => store.options);
  const networkTitle = network === 'MAINNET' ? 'Main network' : 'Test network';

  return (
    <>
      <PageTitle status="success" statusTitle={networkTitle} />
      <div className="content">

        <div className={styles.account}>
          <div className={styles.accountTitle}>Source account:</div>
          <div className={styles.accountAddress}>
            <CopyText
              text={activeAccount.publicKey}
              button={shorter(activeAccount.publicKey, 4)}
            />
          </div>
        </div>

        {children}

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

export default ConfirmLayout;
