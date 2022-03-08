import React from 'react';

import QRCode from 'popup/blocks/QRCode';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import LoadingNetwork from 'popup/pages/LoadingNetwork';

const Receive = () => (
  <>
    <Header />

    <ExtTitle title="Receive" className="content mt-[20px]" />

    <div className="content mt-[33px]">
      <QRCode />
      <LoadingNetwork />
    </div>
  </>
);

export default Receive;
