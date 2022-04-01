import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import maxText from 'popup/utils/maxText';
import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import closeModalAction from 'popup/actions/modal/close';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type AppProps = {
  usage: Usage;
  className?: string;
  handleClick: () => void;
  children: React.ReactNode;
};

const BasicConfirmLayout = ({
  usage,
  children,
  className,
  handleClick,
}: AppProps) => {
  const navigate = useNavigate();
  const { name, publicKey } = useActiveAccount();

  const handleCancel = () => {
    if (usage === 'desktop') {
      closeModalAction();
    } else {
      navigate(RouteName.Home, {
        state: {
          alreadyLoaded: true,
        },
      });
    }
  };

  return (
    <div className={className}>
      <S.Account>
        <S.AccountTitle>Source account:</S.AccountTitle>
        <div className="font-medium">
          <CopyText
            text={publicKey}
            custom={<span>{maxText(name, 12)}</span>}
          />
        </div>
      </S.Account>

      {children}

      <ButtonContainer
        btnSize={100}
        justify="end"
        positionStyles={{
          bottom: usage === 'extension' ? '40px' : '14px',
        }}
      >
        <Button
          type="button"
          variant="default"
          size="medium"
          content="Cancel"
          onClick={handleCancel}
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
  );
};

BasicConfirmLayout.defaultProps = {
  className: '',
};

export default BasicConfirmLayout;
