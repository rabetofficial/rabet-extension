import React from 'react';

import Send from 'popup/blocks/Op/Basic/Send';
import Card from 'popup/components/common/Card';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';

const SendPage = () => (
  <div>
    <Header />
    <div className="content">
      <ExtTitle title="Send" className="my-[20px]" />
      <Card type="secondary" className="px-[11px] pb-7">
        <Send usage="extension" />
      </Card>
    </div>
  </div>
);

export default SendPage;
