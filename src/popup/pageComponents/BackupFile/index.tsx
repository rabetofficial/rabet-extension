import React from 'react';

import CopyText from 'popup/components/CopyText';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import * as S from './styles';

type BackupTypes = {
  onClose: () => void;
  onClick: () => void;
  children: React.ReactNode;
};

const BackupFile = ({ onClose, onClick, children }: BackupTypes) => {
  const { publicKey, privateKey } = useActiveAccount();

  return (
    <S.Container>
      <div>
        {children}
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
            onClick={onClose}
          />
          <Button
            variant="primary"
            size="medium"
            content="Continue"
            onClick={onClick}
            style={{ marginRight: '17px' }}
          />
        </S.ButtonContainer>
      </div>
    </S.Container>
  );
};

export default BackupFile;
