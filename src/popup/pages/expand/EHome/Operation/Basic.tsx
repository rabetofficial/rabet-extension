import React, { useState } from 'react';

import OpBasic from 'popup/blocks/Op/Basic';
import { ElementOption } from 'popup/models';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';

const BasicOperation = () => {
  const modes: ElementOption[] = [
    { value: 'send', label: 'Send' },
    { value: 'swap', label: 'Swap' },
  ];

  const [selected, setSelected] = useState(modes[0]);
  const onChange = (e: ElementOption) => {
    setSelected(e);
  };

  return (
    <InsideTabLayout>
      <div className="pb-[110px]">
        <OpBasic
          onChange={onChange}
          selected={selected}
          modes={modes}
          usage="desktop"
        />
      </div>
    </InsideTabLayout>
  );
};

export default BasicOperation;
