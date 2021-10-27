import React from 'react';

import classNames from 'classnames';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import CopyText from '../../components/CopyText';
import Card from '../../components/Card';

import styles from './styles.less';

const BackupFile = () => (
  <>
    <PageTitle title="Backup" />
    <div className="content">
      <div className={styles.msg}>
        <span>Make a backup of your private key! </span>
        secure it like the millions of dollars it may one day be worth.
      </div>
      <div className={classNames('label-primary', styles.label)}>Private Key</div>
      <div className={styles.box}>
        <Card type="card-primary">
          SRTAVASMW6S344SCW4DESZFEXTCTJPE5KTCFNLyU3ZFLNQZ4TC67SEFU
          <div className={styles.copy}>
            <CopyText copyButton text="SRTAVASMW6S344SCW4DESZFEXTCTJPE5KTCFNLyU3ZFLNQZ4TC67SEFU" />
          </div>
        </Card>
      </div>
      <div className={classNames('label-primary', styles.label)}>Address</div>
      <div className={styles.box}>
        <Card type="card-primary">
          GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0
          <div className={styles.copy}>
            <CopyText copyButton text="GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0" />
          </div>
        </Card>
      </div>
      <div className={classNames('pure-g justify-end', styles.buttons)}>
        <Button
          variant="btn-default"
          size="btn-medium"
          content="Cancel"
        />

        <Button
          variant="btn-primary"
          size="btn-medium"
          content="Continue"
        />
      </div>
    </div>
  </>
);

export default BackupFile;
