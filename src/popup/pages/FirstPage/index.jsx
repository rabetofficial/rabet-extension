import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/Logo';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import { buttonSizes, buttonTypes } from '../../staticRes/enum';

import styles from './styles.less';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pure-g content">
      <div className="pure-u-1-1">
        <Logo />

        <div className={styles.container}>
          <Button
            type="button"
            variant={buttonTypes.primary}
            size={buttonSizes.large}
            content="Create Wallet"
            style={{ marginBottom: '27px' }}
            onClick={() => {
              navigate(route.createWalletPage);
            }}
          />

          <Button
            type="button"
            variant={buttonTypes.outlined}
            size={buttonSizes.large}
            content="Import Wallet"
            style={{ marginBottom: '27px' }}
            onClick={() => {
              navigate(route.restoreWalletPage);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
