import React from 'react';

import Logo from 'popup/components/Logo';
import Loading from 'popup/components/Loading';

const LoadingOne = () => (
  <div className="flex justify-center items-center h-screen w-screen">
    <div>
      <Logo />
      <span className="mt-6">
        <Loading size={42} />
      </span>
    </div>
  </div>
);

export default LoadingOne;
