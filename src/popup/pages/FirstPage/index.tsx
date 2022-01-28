import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '../../components/Logo';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';

import styles from './styles.less';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen justify-center">
      <div className={classNames('2xl:basis-1/3 mt-14 xl:basis-1/3 lg:basis-2/5  md:basis-2/4 sm:basis-3/5 basis-11/12', 'page')}>
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
      </div>
    </div>
  );
};

export default FirstPage;
