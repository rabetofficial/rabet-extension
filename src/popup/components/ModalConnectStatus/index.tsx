import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Button from 'popup/components/common/Button';
import closeModalAction from 'popup/actions/modal/close';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import isOtherConnected from 'popup/utils/isOtherConnected';
import addConnectedWebsite from 'popup/actions/accounts/addConnectedWebsite';
import removeConnectedWebsite from 'popup/actions/accounts/removeConnectedWebsite';

import * as S from './styles';

const ModalConnectStatus = () => {
  const host = useTypedSelector((store) => store.host);
  const { publicKey, isConnected } = useActiveAccount();
  const [othersConnected, setOthersConnected] = useState(false);

  useEffect(() => {
    setOthersConnected(isOtherConnected(publicKey, host));
  }, [host, publicKey, isConnected]);

  const handleConnect = () => {
    addConnectedWebsite({ host, publicKey });

    closeModalAction();
  };

  const handleDisconnect = () => {
    removeConnectedWebsite({ host, publicKey });

    closeModalAction();
  };

  if (isConnected) {
    return (
      <>
        <S.Msg>
          This account is connected to this site. Do you want to
          Disconnect?
        </S.Msg>

        <S.ButtonContainer>
          <Button
            type="button"
            variant="primary"
            size="medium"
            content="Disconnect"
            onClick={handleDisconnect}
            style={{ borderRadius: '4px', marginBottom: '8px' }}
          />
        </S.ButtonContainer>
      </>
    );
  }

  if (othersConnected) {
    return (
      <>
        <S.Msg>
          You have an account connected to this site. Do you want to
          connect with this account?
        </S.Msg>

        <S.ButtonContainer>
          <Button
            type="button"
            variant="primary"
            size="medium"
            content="Connect"
            onClick={handleConnect}
            style={{ borderRadius: '4px', marginBottom: '8px' }}
          />
        </S.ButtonContainer>
      </>
    );
  }

  return (
    <S.Msg className="pb-2 px-2">
      Rabet is not connected to this site. To connect it, find connect
      button on their site.
    </S.Msg>
  );
};

export default ModalConnectStatus;
