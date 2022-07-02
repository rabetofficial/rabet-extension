import React from 'react';

import ExtTitle from 'popup/components/common/Title/Ext';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const BasicConfirmSend = () => {
  const { network } = useTypedSelector((store) => store.options);

  const networkTitle =
    network === 'MAINNET' ? 'Main network' : 'Test network';

  const status = network === 'MAINNET' ? 'success' : 'warn';

  return (
    <div className="content mt-4">
      <ExtTitle status={status} title={networkTitle} />
    </div>
  );
};

export default BasicConfirmSend;
