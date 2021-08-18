import React, { useState } from 'react';
import Overlay from 'react-loading-overlay';

import Loading from '../../components/Loading';

import styles from './styles.less';

const LoadingOverlay = () => {
  const [isActive] = useState(true);

  return (
    <div className={styles.container}>
      <Overlay
        active={isActive}
        spinner={<Loading size={125} />}
        classNamePrefix="overlay_"
      >
        <div className="pure-g">
          <p style={{ marginTop: '100px' }}>Some content or children or something.</p>
        </div>
      </Overlay>
    </div>
  );
};

LoadingOverlay.propTypes = {

};

export default LoadingOverlay;
