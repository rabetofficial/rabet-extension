import React from 'react';

import Card from 'popup/components/common/Card';
import Swap from 'popup/blocks/Op/Basic/Swap';
import ExtTitle from 'popup/components/common/Title/Ext';
import Header from 'popup/components/common/Header';

const SwapPage = () => (
  <>
    <Header />
    <div className="content">
      <ExtTitle title="Swap" className="my-[20px]" />
      <Card type="secondary" className="px-[11px]">
        <Swap usage="extension" />
      </Card>
    </div>
  </>
);
export default SwapPage;
