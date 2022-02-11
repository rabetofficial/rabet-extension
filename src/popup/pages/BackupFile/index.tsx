import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import ModalDialog from 'popup/components/common/ModalDialog';
import CopyText from 'popup/components/CopyText';
import currentActiveAccount from 'popup/utils/activeAccount';

import * as S from './styles';

const BackupFile = () => {
  const navigate = useNavigate();
  const { activeAccount } = currentActiveAccount();
  const { publicKey, privateKey } = activeAccount;

  const handleClick = () => {
    navigate(RouteName.Home);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <button type="button" onClick={handleOpen}>
        open
      </button>
      <ModalDialog
        title="Backup file"
        size="medium"
        isOpen={open}
        onClose={handleClose}
      >
        <div className="content">
          <S.Msg>
            <span>Make a backup of your private key! </span>secure it
            like the millions of dollars it may one day be worth.
          </S.Msg>
          <S.Label>Private Key</S.Label>
          <S.Box>
            <div className="hide-blur">{privateKey}</div>
            <S.Copy>
              <CopyText copyButton text={privateKey} />
            </S.Copy>
          </S.Box>
          <S.Label>Address</S.Label>
          <S.Box>
            {publicKey}
            <S.Copy>
              <CopyText copyButton text={publicKey} />
            </S.Copy>
          </S.Box>
          <S.ButtonContainer>
            <Button
              variant="default"
              size="medium"
              content="Cancel"
              onClick={handleClose}
            />
            <Button
              variant="primary"
              size="medium"
              content="Continue"
              onClick={handleClick}
              style={{ marginRight: '17px' }}
            />
          </S.ButtonContainer>
        </div>
      </ModalDialog>
    </>
  );
};

export default BackupFile;
