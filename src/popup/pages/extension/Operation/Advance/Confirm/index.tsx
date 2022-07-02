import React from 'react';

import ConfirmOp from 'popup/blocks/Op/Advance/Confirm';
import { useNavigate } from 'react-router-dom';
import RouteName from 'popup/staticRes/routes';
import ConfirmTitle from './ConfirmTitle';

const ConfirmAdvancedOperation = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <ConfirmTitle />
      <ConfirmOp usage="extension" onClose={handleClose} />
    </>
  );
};

export default ConfirmAdvancedOperation;
