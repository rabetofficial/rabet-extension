import React, { useState } from 'react';

import Header from 'popup/components/common/Header';
import OpBasic from 'popup/blocks/Operation/Basic';
import ExtTitle from 'popup/components/common/Title/Ext';
import { ElementOption } from 'popup/models';

const OperationBasic = () => {
  const modes: ElementOption[] = [
    { value: 'send', label: 'Send' },
    { value: 'swap', label: 'Swap' },
  ];

  const [selected, setSelected] = useState(modes[0]);
  const onChange = (e: ElementOption) => {
    setSelected(e);
  };

  return (
    <>
      <Header />

      <div className="content">
        <ExtTitle
          title={`${selected.label}`.toString()}
          className="mt-[20px]"
        />

        <OpBasic
          onChange={onChange}
          selected={selected}
          modes={modes}
        />
      </div>
    </>
  );
};

export default OperationBasic;
