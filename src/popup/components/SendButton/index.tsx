import { connect } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Button from '../common/Button';

const SendButton = ({ transaction }) => {
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

export default connect((state) => ({
  transaction: state.transaction,
}))(SendButton);
