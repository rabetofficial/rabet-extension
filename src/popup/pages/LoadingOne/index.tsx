import React from 'react';

import Logo from 'popup/components/Logo';
import Loading from 'popup/components/Loading';

const LoadingOne = () => (
  <div style={{ marginTop: '167px' }}>
    <Logo />
    <div>
      <Loading size={42} />
    </div>
  </div>
);

export default LoadingOne;
