import React, { useRef, useEffect } from 'react';

import CopyText from 'popup/components/common/CopyText';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type BackupTypes = {
  onClick: () => void;
  children?: React.ReactNode;
};

const BackupFile = ({ onClick, children }: BackupTypes) => {
  const btnRef = useRef(null);
  const { publicKey, privateKey } = useActiveAccount();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.focus();
    }
  }, [btnRef]);

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
            <CopyText fullIcon text={privateKey} />
          </S.Copy>
        </S.Box>

        <S.Label style={{ marginTop: '25px' }}>Address</S.Label>
        <S.Box>
          {publicKey}
          <S.Copy>
            <CopyText fullIcon text={publicKey} />
          </S.Copy>
        </S.Box>
        <S.ButtonContainer>
          <ButtonContainer
            mt={32}
            btnSize={100}
            justify="end"
            gap={7}
          >
            <Button
              reference={btnRef}
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
