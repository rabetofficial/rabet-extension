import React from 'react';

import Loading from 'popup/components/Loading';

const LoadingOne = () => (
  <div style={{ marginTop: '215px' }}>
    <div className="mt-2">
      <Loading title="Sending to network" size={95} />
    </div>
  </div>
);

export default LoadingOne;
