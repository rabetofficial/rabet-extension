import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

const BasicOperation = () => (
  <div>
    <div className={styles.page}>
      <div className={classNames('content', styles.content)}>
        basic page
      </div>
    </div>
  </div>
);

export default BasicOperation;
