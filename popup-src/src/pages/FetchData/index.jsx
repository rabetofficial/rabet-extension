import React from 'react';

import Header from '../../components/Header';
import Loading from '../../components/Loading';

const FetchData = () => (
  <>
    <Header />
    <div style={{ marginTop: '170px' }}>
      <Loading title="Sending to network" size={125} />
    </div>
  </>
);

export default FetchData;
