import React from 'react';

import Send from 'popup/blocks/Op/Basic/Send';
import Card from 'popup/components/common/Card';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';

const SendPage = () => (
  <div style={{ maxWidth: '360px' }}>
    <Header />
    <ScrollBar isHidden maxHeight={600}>
      <div className="content">
        <ExtTitle title="Send" className="my-[20px]" />
        <Card type="secondary" className="px-[11px] pb-7">
          <Send usage="extension" />
        </Card>
      </div>
    </ScrollBar>
  </div>
);

export default SendPage;
