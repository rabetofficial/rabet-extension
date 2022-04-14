import React from 'react';

import Header from 'popup/components/common/Header';
import LoadingNetwork from 'popup/pages/LoadingNetwork';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';

const LoadingNerwork = () => (
  <div style={{ maxWidth: '360px' }}>
    <ScrollBar isHidden>
      <Header />

      <div className="content ">
        <ExtTitle alreadyLoaded={false} noMultiplyIcon />
        <div className="mt-[150px]" style={{ width: '328px' }}>
          <LoadingNetwork />
        </div>
      </div>
    </ScrollBar>
  </div>
);

export default LoadingNerwork;
