import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/Logo';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';
import Layout1 from '../../components/Layout1';

import styles from './styles.less';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <Layout1>
      <Logo />

      <div className={styles.container}>
        <Button
          className={styles.mbButton}
          type="button"
          variant="primary"
          size="large"
          content="Create Wallet"
          style={{ marginBottom: '28px' }}
          onClick={() => {
            navigate(route.createWalletPage);
          }}
        />

        <Button
          type="button"
          variant="outlined"
          size="large"
          content="Import Wallet"
          onClick={() => {
            navigate(route.restoreWalletPage);
          }}
        />
      </div>
    </Layout1>
  );
};

export default FirstPage;
