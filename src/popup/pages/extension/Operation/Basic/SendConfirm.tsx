import React from 'react';
import { useSelector } from 'react-redux';

import ConfirmSend from 'popup/blocks/Op/Basic/Send/Confirm';
import ExtTitle from 'popup/components/common/Title/Ext';

const SendConfirm = () => {
  const { network } = useSelector((store) => store.options);
  const networkTitle =
    network === 'MAINNET' ? 'Main network' : 'Test network';

  const status = network === 'MAINNET' ? 'success' : 'warn';

  return (
    <div className="content mt-8">
      <ExtTitle status={status} title={networkTitle} />
      <ConfirmSend />
    </div>
  );
};

export default SendConfirm;
