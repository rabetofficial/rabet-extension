import React, { useEffect } from 'react';

import config from '../../../config';
import offline from '../../../assets/images/offline.svg';

import styles from './styles.less';

const OfflineMode = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.sleeping}>
        <span>z</span>
        <span>z</span>
        <span>z</span>
        <img src={offline} width={58} height={119} alt="rabet offline" />
      </div>

      <div className={styles.title}>You are offline</div>
      <div className={styles.msg}>Go back online to use Rabet</div>
    </div>
  );
};

export default OfflineMode;
