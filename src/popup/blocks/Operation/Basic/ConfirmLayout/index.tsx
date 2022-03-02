import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import ExtTitle from 'popup/components/common/Title/Ext';
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
  const { network } = useSelector((store) => store.options);
  const networkTitle =
    network === 'MAINNET' ? 'Main network' : 'Test network';

  const status = network === 'MAINNET' ? 'success' : 'warn';

  return (
    <>
      <ExtTitle status={status} title={networkTitle} />
      <div className="content">
        <S.Account>
          <S.AccountTitle>Source account:</S.AccountTitle>
          <div className="font-medium">
            <CopyText
              text={activeAccount.publicKey}
              custom={shorter(activeAccount.publicKey, 4)}
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
      </div>
    </>
  );
};

export default ConfirmLayout;
