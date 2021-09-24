import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/Button';
import { SendPage, QRCodePage } from '../../../staticRes/routes';
import { buttonSizes, buttonTypes } from '../../../staticRes/enum';

import styles from './styles.less';

const Links = () => (
  <div className={styles.buttonBox}>
    <Link to={SendPage}>
      <Button
        size={buttonSizes.small}
        variant={buttonTypes.primary}
        content="Operation"
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

export default Links;
