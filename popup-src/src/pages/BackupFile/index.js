import React from 'react';

import classNames from 'classnames';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';

import styles from './styles.less';
import CopyText from '../../components/CopyText';

const copyBtn = (
  <>
    <span className="icon-sheet" />
    Copy
  </>
);

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
        SRTAVASMW6S344SCW4DESZFEXTCTJPE5KTCFNLyU3ZFLNQZ4TC67SEFU
        <Button
          variant="btn-basic-default"
          size="btn-small"
          content={<CopyText text="test1" button={copyBtn} />}
        />
      </div>
      <div className={classNames('label-primary', styles.label)}>Address</div>
      <div className={styles.box}>
        GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0
        <Button
          variant="btn-basic-default"
          size="btn-small"
          content={<CopyText text="test2" button={copyBtn} />}
        />
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
