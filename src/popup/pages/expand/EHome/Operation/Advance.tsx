import React from 'react';

import OpAdvance from 'popup/blocks/Op/Advance';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';
import ScrollBar from 'popup/components/common/ScrollBar';

const AdvanceOperation = () => (
  <InsideTabLayout>
    <ScrollBar isHidden maxHeight={600}>
      <div className="pb-6">
        <OpAdvance />
      </div>
    </ScrollBar>
  </InsideTabLayout>
);

export default AdvanceOperation;
