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
    <div className="flex justify-center align-center mt-3">
      <Link
        to={isAdvanced ? advanceOperationPage : basicOperationPage}
      >
        <Button
          size="small"
          variant="primary"
          content="Send"
          style={{ width: '112px', marginRight: '8px' }}
        />
      </Link>
      <Link to={QRCodePage}>
        <Button
          size="small"
          variant="outlined"
          content="Receive"
          style={{ width: '112px', marginLeft: '8px' }}
        />
      </Link>
    </div>
  );
};

export default Links;
