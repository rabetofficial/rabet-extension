import React from 'react';

import CopyText from 'popup/components/CopyText';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type BackupTypes = {
  onClick: () => void;
  children?: React.ReactNode;
};

const BackupFile = ({ onClick, children }: BackupTypes) => {
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

        <S.Label style={{ marginTop: '25px' }}>Address</S.Label>
        <S.Box>
          {publicKey}
          <S.Copy>
            <CopyText copyButton text={publicKey} />
          </S.Copy>
        </S.Box>
        <S.ButtonContainer>
          <ButtonContainer mt={32} btnSize={100} justify="end">
            <Button
              variant="primary"
              size="medium"
              content="Continue"
              onClick={onClick}
            />
          </ButtonContainer>
        </S.ButtonContainer>
      </div>
    </S.Container>
  );
};
BackupFile.defaultProps = {
  children: '',
};

export default BackupFile;
