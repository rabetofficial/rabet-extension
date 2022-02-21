import React from 'react';

import Header from 'popup/components/common/Header';
import QRCode from 'popup/blocks/QRCode';
import ExtTitle from 'popup/components/common/Title/Ext';

const Receive = () => (
  <>
    <Header />
    <ExtTitle title="Receive" className="content mt-[20px]" />
    <div className="content mt-[33px]">
      <QRCode />
    </div>
  </>
);

export default Receive;
