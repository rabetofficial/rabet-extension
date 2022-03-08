import React from 'react';

import OpAdvance from 'popup/blocks/Op/Advance';
import ExtTitle from 'popup/components/common/Title/Ext';
import Header from 'popup/components/common/Header';
import ScrollBar from 'popup/components/common/ScrollBar';

const OperationAdvance = () => (
  <ScrollBar isHidden maxHeight={600}>
    <div className="pb-6">
      <Header />

      <ExtTitle title="Operation" className="content mt-4" />
      <OpAdvance />
    </div>
  </ScrollBar>
);

export default OperationAdvance;
