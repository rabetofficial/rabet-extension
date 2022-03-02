import React from 'react';

import Header from 'popup/components/common/Header';
import OpBasic from 'popup/blocks/Operation/Basic';
import ExtTitle from 'popup/components/common/Title/Ext';

const OperationBasic = () => (
  <div>
    <Header />

    <ExtTitle title="Receive" className="content mt-[20px]" />
    {/* <ExtTitle title={selected.label} /> */}
    <OpBasic />
  </div>
);

export default OperationBasic;
