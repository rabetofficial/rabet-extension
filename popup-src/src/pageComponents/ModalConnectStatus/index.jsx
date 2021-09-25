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
    isOtherConnected,
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

  if (isOtherConnected) {
    return (
      <div>
        You have an account connected to this site.
        Do you want to connect with this account?
        <Button
          type="button"
          variant="btn-primary"
          size="btn-medium"
          content="Connect"
          onClick={handleConnect}
        />
      </div>
    );
  }

  return (
    <div>
      Rabet is not connected to this site.
      To connect to the site,
      find the connect button on their site.
    </div>
  );
};

export default ModalConnectStatus;
