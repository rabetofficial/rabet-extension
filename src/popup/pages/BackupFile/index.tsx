import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import Card from 'popup/components/Card';
import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import CopyText from 'popup/components/CopyText';
import PageTitle from 'popup/components/PageTitle';
import currentActiveAccount from 'popup/utils/activeAccount';

import styles from './styles.less';

const BackupFile = () => {
  const navigate = useNavigate();
  const { activeAccount } = currentActiveAccount();
  const { publicKey, privateKey } = activeAccount;

  const handleClick = () => {
    navigate(RouteName.Home);
  };

  return (
    <>
      <PageTitle title="Backup" />
      <div className="content">
        <div className={styles.msg}>
          <span>Make a backup of your private key! </span>
          secure it like the millions of dollars it may one day be
          worth.
        </div>
        <div className={classNames('label-primary', styles.label)}>
          Private Key
        </div>
        <div className={styles.box}>
          <Card type="card-primary">
            <div className="hide-blur">{privateKey}</div>
            <div className={styles.copy}>
              <CopyText copyButton text={privateKey} />
            </div>
          </Card>
        </div>
        <div className={classNames('label-primary', styles.label)}>
          Address
        </div>
        <div className={styles.box}>
          <Card type="card-primary">
            {publicKey}
            <div className={styles.copy}>
              <CopyText copyButton text={publicKey} />
            </div>
          </Card>
        </div>
        <div
          className={classNames('pure-g justify-end', styles.buttons)}
        >
          <Button
            variant="primary"
            size="medium"
            content="Continue"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default BackupFile;
