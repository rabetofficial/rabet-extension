import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from 'popup/components/common/Button';
import {
  advanceOperationPage,
  basicOperationPage,
  QRCodePage,
} from 'popup/staticRes/routes';

import styles from './styles.less';

const Links = () => {
  const { mode } = useSelector((store) => store.options);

  const isAdvanced = mode === 'ADVANCED';

  return (
    <div className={styles.buttonBox}>
      <Link
        to={isAdvanced ? advanceOperationPage : basicOperationPage}
      >
        <Button
          size="small"
          variant="primary"
          content="Operation"
          style={{ width: '112px' }}
        />
      </Link>
      <Link to={QRCodePage}>
        <Button
          size="small"
          variant="outlined"
          content="Receive"
          style={{ width: '112px' }}
        />
      </Link>
    </div>
  );
};

export default Links;
