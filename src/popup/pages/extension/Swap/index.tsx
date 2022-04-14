import React from 'react';

import Card from 'popup/components/common/Card';
import Swap from 'popup/blocks/Op/Basic/Swap';
import ExtTitle from 'popup/components/common/Title/Ext';
import Header from 'popup/components/common/Header';
import ScrollBar from 'popup/components/common/ScrollBar';

const SwapPage = () => (
  <div style={{ maxWidth: '360px' }}>
    <Header />
    <ScrollBar isHidden maxHeight={600}>
      <div className="content">
        <ExtTitle title="Swap" className="my-[20px]" />
        <Card type="secondary" className="px-[11px]">
          <Swap usage="extension" />
        </Card>
      </div>
    </ScrollBar>
  </div>
);
export default SwapPage;
