import React from 'react';

import Header from 'popup/components/common/Header';
import ScrollBar from 'popup/components/common/ScrollBar';
import ExtTitle from 'popup/components/common/Title/Ext';

import ClaimableBalancesComponent from 'popup/blocks/ClaimableBalances';

const ClaimableBalances = () => (
  <>
    <Header />

    <ScrollBar isHidden maxHeight={540}>
      <div style={{ maxWidth: '360px' }}>
        <div className="content">
          <ExtTitle title="Claimable balance" className="mt-4" />
          <ClaimableBalancesComponent />
        </div>
      </div>
    </ScrollBar>
  </>
);
export default ClaimableBalances;
