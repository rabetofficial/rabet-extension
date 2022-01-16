import React from 'react';

import Logo from '../../components/Logo';
import Loading from '../../components/Loading';

import styles from './styles.less';

const LoadingOne = () => (
  <div style={{ marginTop: '167px' }}>
    <Logo />

    <div className={styles.loading}>
      <Loading size={58} />
    </div>
  </div>
);

export default LoadingOne;
