import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import CopyText from 'popup/components/CopyText';
import currentActiveAccount from 'popup/utils/activeAccount';
import PageTitle from 'popup/components/PageTitle';

import * as S from './styles';

const BackupFile = () => {
  const navigate = useNavigate();
  const { activeAccount } = currentActiveAccount();
  const { publicKey, privateKey } = activeAccount;

  const handleClick = () => {
    navigate(RouteName.Home);
  };
  const handleClose = () => {
    navigate(RouteName.First);
  };
  return (
    <S.Container>
      <div>
        <PageTitle title="Backup" />
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
    </S.Container>
  );
};

export default BackupFile;
