import React, { useState, useEffect } from 'react';

import isConnected from '../../helpers/isConnected';
import currentActiveAccount from '../../helpers/activeAccount';

const ModalConnectStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    const { activeAccount } = currentActiveAccount();

    isConnected(activeAccount.publicKey)
      .then((host) => {
        setResult(host);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <p>Loading</p>
    );
  }

  if (result) {
    return <div>This account is connected to this site. Do you want to Disconnect?</div>;
  }

  return (
    <div>This account is not connected to this site. Do you want to connect?</div>
  );
};

export default ModalConnectStatus;
