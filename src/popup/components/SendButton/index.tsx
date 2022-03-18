import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import Confirm from '../Confirm';

const SendButton = () => {
  const navigate = useNavigate();
  const { operations, memo } = useTypedSelector(
    (store) => store.transaction,
  );

  const handleClick = () => {
    openModalAction({
      isStyled: false,
      title: 'Create contact',
      size: 'medium',
      padding: 'large',
      minHeight: 470,
      children: <Confirm />,
    });
  };

  console.log(operations, memo);

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
