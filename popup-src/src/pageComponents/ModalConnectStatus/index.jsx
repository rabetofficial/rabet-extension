import React from 'react';

import Button from '../../components/Button';
import addConnectedWebsite from '../../actions/accounts/addConnectedWebsite';
import removeConnectedWebsite from '../../actions/accounts/removeConnectedWebsite';

const ModalConnectStatus = (props) => {
  const {
    host,
    result,
    publicKey,
    toggleModal,
  } = props;

  const handleConnect = () => {
    addConnectedWebsite(`${host}/${publicKey}`);
    toggleModal();
  };

  const handleDisconnect = () => {
    removeConnectedWebsite(result);
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
