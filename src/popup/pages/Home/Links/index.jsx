import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../../../components/Button';
import { advanceOperationPage, basicOperationPage, QRCodePage } from '../../../staticRes/routes';
import { buttonSizes, buttonTypes } from '../../../staticRes/enum';

import styles from './styles.less';

const Links = () => {
  const { mode } = useSelector((store) => store.options);

  const isAdvanced = mode === 'ADVANCED';

  return (
    <div className={styles.buttonBox}>
      <Link to={isAdvanced ? advanceOperationPage : basicOperationPage}>
        <Button
          size={buttonSizes.small}
          variant={buttonTypes.primary}
          content={isAdvanced ? 'Operation' : 'Send'}
          style={{ width: '112px' }}
        />
      </Link>
      <Link to={QRCodePage}>
        <Button
          size={buttonSizes.small}
          variant={buttonTypes.outlined}
          content="Receive"
          style={{ width: '112px' }}
        />
      </Link>
    </div>
  );
};

export default Links;
