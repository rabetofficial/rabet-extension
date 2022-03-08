import React from 'react';
import { useLocation } from 'react-router-dom';

import Confirm from 'popup/blocks/Op/Basic/Confirm/Send';
import ExtTitle from 'popup/components/common/Title/Ext';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const BasicConfirmSend = () => {
  const { state } = useLocation();
  const { network } = useTypedSelector((store) => store.options);

  const networkTitle =
    network === 'MAINNET' ? 'Main network' : 'Test network';

  const status = network === 'MAINNET' ? 'success' : 'warn';

  return (
    <div className="content mt-8">
      <ExtTitle status={status} title={networkTitle} />
      <div className="mt-[28px]">
        <Confirm usage="extension" values={state.values} />
      </div>
    </div>
  );
};

export default BasicConfirmSend;
