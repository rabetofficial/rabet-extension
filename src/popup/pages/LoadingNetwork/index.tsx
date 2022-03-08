import React from 'react';

import Loading from 'popup/components/Loading';

const LoadingNetwork = () => (
  <div>
    <div className="mt-2">
      <Loading title="Sending to network" size={52} />
    </div>
  </div>
);

export default LoadingNetwork;
