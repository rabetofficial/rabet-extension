import React from 'react';

import config from '../../config';
import styles from '../Error/styles.less';
import NoteCard from '../../pageComponents/NoteCard';

const OfflineMode = () => {
  setTimeout(() => {
    window.close();
  }, config.OFFLINE_MODE_TIMEOUT_SECONDS * 1000);

  return (
    <>
      <div className={styles.card}>
        <NoteCard
          title="Error"
          message="You are offline. Try again later."
          icon="icon-exclamation-triangle"
          iconClass={styles.icon}
        />
      </div>
    </>
  );
};

export default OfflineMode;
