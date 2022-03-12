import React from 'react';

import Loading from 'popup/components/Loading';

const LoadingNetwork = () => (
  <div>
    <div className="mt-2">
      <Loading title="Sending to network" size={78} />
    </div>
  </div>
);

export default LoadingNetwork;
