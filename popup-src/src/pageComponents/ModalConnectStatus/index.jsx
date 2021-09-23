import React from 'react';

import Button from '../../components/Button';

const ModalConnectStatus = (props) => {
  const {
    host,
    result,
    publicKey,
    toggleModal,
  } = props;

  const handleConnect = () => {
    console.log(`just add ${host}/${publicKey} to connected websites`);
    toggleModal();
  };

  const handleDisconnect = () => {
    console.log(`just remove ${result} from connected websites`);
    toggleModal();
  };

  if (result) {
    return (
      <div>
        This account is connected to this site. Do you want to Disconnect?
        <Button
          type="button"
          variant="btn-primary"
          size="btn-medium"
          content="Disconnect"
          onClick={handleDisconnect}
        />
      </div>
    );
  }

  return (
    <div>
      This account is not connected to this site. Do you want to connect?
      <Button
        type="button"
        variant="btn-primary"
        size="btn-medium"
        content="Connect"
        onClick={handleConnect}
      />
    </div>
  );
};

export default ModalConnectStatus;
