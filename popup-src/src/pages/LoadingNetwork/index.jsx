import React from 'react';

import Loading from '../../components/Loading';

import styles from './styles.less';

const LoadingOne = () => (
  <div style={{ marginTop: '215px' }}>

    <div className={styles.loading}>
      <Loading title="Sending to network" size={95} />
    </div>
  </div>
);

export default LoadingOne;
