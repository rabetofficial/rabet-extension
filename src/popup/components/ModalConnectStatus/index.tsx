import React from 'react';

import styled from 'styled-components';
import Button from 'popup/components/common/Button';
import addConnectedWebsite from 'popup/actions/accounts/addConnectedWebsite';
import removeConnectedWebsite from 'popup/actions/accounts/removeConnectedWebsite';

type ModalConnectStatusType = {
  host: any;
  result: any;
  publicKey: string;
  toggleModal: any;
  forceUpdate: any;
  isOtherConnected: boolean;
};
const ModalConnectStatus = ({
  host,
  result,
  publicKey,
  toggleModal,
  forceUpdate,
  isOtherConnected,
}: ModalConnectStatusType) => {
  const handleConnect = () => {
    addConnectedWebsite({ host, publicKey }, forceUpdate);
    toggleModal();
  };

  const handleDisconnect = () => {
    removeConnectedWebsite({ host, publicKey }, forceUpdate);
    toggleModal();
  };

  if (result) {
    return (
      <div>
        This account is connected to this site. Do you want to
        Disconnect?
        <ButtonContainer>
          <Button
            type="button"
            variant="primary"
            size="medium"
            content="Disconnect"
            onClick={handleDisconnect}
            style={{ borderRadius: '4px' }}
          />
        </ButtonContainer>
      </div>
    );
  }

  if (isOtherConnected) {
    return (
      <div>
        You have an account connected to this site. Do you want to
        connect with this account?
        <ButtonContainer>
          <Button
            type="button"
            variant="primary"
            size="medium"
            content="Connect"
            onClick={handleConnect}
            style={{ borderRadius: '4px' }}
          />
        </ButtonContainer>
      </div>
    );
  }

  return (
    <div>
      Rabet is not connected to this site. To connect it, find connect
      button on their site.
    </div>
  );
};
const ButtonContainer = styled.div`
  margin-top: 45px;
  font-size: 18px;
  width: 100%;
`;
export default ModalConnectStatus;
