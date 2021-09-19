import { connect } from 'react-redux';
import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../Button';
import * as route from '../../staticRes/routes';

const SendButton = ({ history, transaction }) => {
  const handleClick = () => {
    history.push(route.ConfirmPage);
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
      variant="btn-primary"
      size="btn-medium"
      content="Send"
      disabled={isDisabled}
    />
  );
};

export default withRouter(connect((state) => ({
  transaction: state.transaction,
}))(SendButton));
