import React from 'react';

import Button from 'popup/components/common/Button';
import Confirm from 'popup/blocks/Op/Advance/Confirm';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const SendButton = () => {
  const { operations, memo } = useTypedSelector(
    (store) => store.transaction,
  );

  const handleClick = () => {
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
