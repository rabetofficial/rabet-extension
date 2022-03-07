import React from 'react';

import Logo from 'popup/components/Logo';
import Loading from 'popup/components/Loading';

const LoadingOne = () => (
  <div style={{ marginTop: '167px' }}>
    <Logo />

    <div className="mt-2">
      <Loading size={58} />
    </div>
  </div>
);

export default LoadingOne;
