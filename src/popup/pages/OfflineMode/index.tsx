import React, { useEffect } from 'react';

import config from '../../../config';
import offline from '../../../assets/images/offline.svg';
import Layout1 from '../../components/Layout1';

import styles from './styles.less';

const OfflineMode = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);
  }, []);

  return (
    <Layout1 alignCenter>
      <div className={styles.sleeping}>
        <span>z</span>
        <span>z</span>
        <span>z</span>
        <img src={offline} width={58} height={119} alt="rabet offline" />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.title}>You are offline</div>
        <div className={styles.msg}>Go back online to use Rabet</div>
      </div>
    </Layout1>
  );
};

export default OfflineMode;
