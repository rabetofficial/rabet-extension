import React from 'react';

import OpAdvance from 'popup/blocks/Op/Advance';
import ExtTitle from 'popup/components/common/Title/Ext';
import Header from 'popup/components/common/Header';

const OperationAdvance = () => (
  <>
    <Header />

    <ExtTitle title="Operation" className="content mt-4" />
    <OpAdvance />
  </>
);

export default OperationAdvance;
