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
          <ClaimableBalancesComponent
            amount={1111}
            assetCode="XLM"
            status="early"
            fromDate="22 Feb 2020"
            toDate="28 Feb 2022"
            assetImg="https://rabet.io/static/rabet-coin-64.png"
            sponsorId="GA22XVEJYXFFWJPL5Q4DKN3EWMGA3P5TWV5ZKKSBNJKJZCTZSJ4N75VN"
          />
        </div>
      </div>
    </ScrollBar>
  </>
);
export default ClaimableBalances;
