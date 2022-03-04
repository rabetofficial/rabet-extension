import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import shorter from 'popup/utils/shorter';
import currentActiveAccount from 'popup/utils/activeAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
  handleClick: () => void;
};

const ConfirmLayout = ({ children, handleClick }: AppProps) => {
  const navigate = useNavigate();
  const { activeAccount } = currentActiveAccount();

  return (
    <>
      <S.Account>
        <S.AccountTitle>Source account:</S.AccountTitle>
        <div className="font-medium">
          <CopyText
            text={activeAccount.publicKey}
            custom={
              <span>{shorter(activeAccount.publicKey, 4)}</span>
            }
          />
        </div>
      </S.Account>

      {children}

      <ButtonContainer
        btnSize={100}
        justify="end"
        positionStyles={{ bottom: '40px', right: '16px' }}
      >
        <Button
          type="button"
          variant="default"
          size="medium"
          content="Cancel"
          onClick={() => {
            navigate(-1);
          }}
        />

        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Confirm"
          onClick={handleClick}
        />
      </ButtonContainer>
    </>
  );
};

export default ConfirmLayout;