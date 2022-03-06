import React from 'react';
import { useSelector } from 'react-redux';

import Confirm from 'popup/blocks/Op/Basic/Confirm/Swap';
import ExtTitle from 'popup/components/common/Title/Ext';

const BasicConfirmSwap = () => {
  const { network } = useSelector((store) => store.options);
  const networkTitle =
    network === 'MAINNET' ? 'Main network' : 'Test network';

  const status = network === 'MAINNET' ? 'success' : 'warn';

  return (
    <div className="content mt-8">
      <ExtTitle status={status} title={networkTitle} />
      <Confirm />
    </div>
  );
};

export default BasicConfirmSwap;
