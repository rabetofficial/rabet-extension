import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from 'popup/components/common/Button';
import {
  advanceOperationPage,
  basicOperationPage,
  QRCodePage,
} from 'popup/staticRes/routes';
import ButtonContainer from 'popup/components/common/ButtonContainer';

const Links = () => {
  const { mode } = useSelector((store) => store.options);

  const isAdvanced = mode === 'ADVANCED';

  return (
    <ButtonContainer btnSize={112} mt={12} justify="center" gap={16}>
      <Link
        to={isAdvanced ? advanceOperationPage : basicOperationPage}
      >
        <Button size="small" variant="primary" content="Send" />
      </Link>
      <Link to={QRCodePage}>
        <Button size="small" variant="outlined" content="Receive" />
      </Link>
    </ButtonContainer>
  );
};

export default Links;
