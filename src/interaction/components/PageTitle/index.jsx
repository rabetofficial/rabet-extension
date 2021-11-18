import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

const PageTitle = ({
  // title,
  statusTitle,
}) => (
  <div className={styles.div}>
    <div>
      <h1 className={classNames(styles.status, statusTitle !== 'mainnet' ? styles.warn : styles.success)}>
        <span />

        {statusTitle === 'mainnet' ? 'Main network' : 'Test network'}
      </h1>
    </div>
  </div>
);

export default PageTitle;
