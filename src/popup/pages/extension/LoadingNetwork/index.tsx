import React from 'react';

import Header from 'popup/components/common/Header';
import LoadingNetwork from 'popup/pages/LoadingNetwork';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';

const SuccessfulSubmission = () => (
  <ScrollBar isHidden>
    <Header />

    <div className="content">
      <ExtTitle
        className="content mt-[20px] mb-[87px]"
        alreadyLoaded={false}
      />

      <div className="py-3">
        <LoadingNetwork />
      </div>
    </div>
  </ScrollBar>
);

export default SuccessfulSubmission;
