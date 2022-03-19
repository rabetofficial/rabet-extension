import React from 'react';

import { Usage } from 'popup/models';
import RouteName from 'popup/staticRes/routes';
import { useNavigate } from 'react-router-dom';
import Button from 'popup/components/common/Button';
import Confirm from 'popup/blocks/Op/Advance/Confirm';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import useTypedSelector from 'popup/hooks/useTypedSelector';

type SendButtonProps = {
  usage: Usage;
};

const SendButton = ({ usage }: SendButtonProps) => {
  const navigate = useNavigate();
  const { operations, memo } = useTypedSelector(
    (store) => store.transaction,
  );

  const handleClick = () => {
    if (usage === 'desktop') {
      openModalAction({
        isStyled: false,
        title: '',
        size: 'medium',
        padding: 'large',
        minHeight: 534,
        children: (
          <Confirm onClose={closeModalAction} usage="desktop" />
        ),
      });
    } else {
      navigate(RouteName.Confirm);
    }
  };

  let isDisabled = false;

  if (!operations.length) {
    isDisabled = true;
  }

  for (let i = 0; i < operations.length; i += 1) {
    if (!operations[i].checked) {
      isDisabled = true;
    }
  }

  if (memo.text && !memo.checked) {
    isDisabled = true;
  }

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      size="medium"
      content="Send"
      disabled={isDisabled}
    />
  );
};

export default SendButton;
