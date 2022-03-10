import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const SendButton = () => {
  const transaction = useTypedSelector((store) => store.transaction);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RouteName.Confirm);
  };

  const { operations, memo } = transaction;

  let isDisabled = false;

  if (!operations.length) {
    isDisabled = true;
  }

  for (let i = 0; i < operations.length; i += 1) {
    if (!operations[i].checked) {
      isDisabled = true;
    }
  }

  if (!memo.checked) {
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
