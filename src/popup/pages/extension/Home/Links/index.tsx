import React from 'react';
import { Link } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const Links = () => {
  const { mode } = useTypedSelector((store) => store.options);

  const isAdvanced = mode === 'ADVANCED';

  return (
    <div className="flex justify-center align-center mt-2">
      <Link
        to={
          isAdvanced
            ? RouteName.AdvancedOperation
            : RouteName.BasicOperation
        }
      >
        <Button
          size="small"
          variant="primary"
          content="Send"
          style={{ width: '112px', marginRight: '8px' }}
        />
      </Link>
      <Link to={RouteName.QRCode}>
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
