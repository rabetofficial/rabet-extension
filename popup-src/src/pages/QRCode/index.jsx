import React from 'react';
import QR from 'qrcode.react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Card from '../../components/Card';
import Header from '../../components/Header';
import CopyText from '../../components/CopyText';
import PageTitle from '../../components/PageTitle';
import currentActiveAccount from '../../helpers/activeAccount';

import styles from './styles.less';

const QRCode = () => {
  const { activeAccount } = currentActiveAccount();

  return (
    <>
      <Header />
      <PageTitle title="Receive" />
      <div className={classNames('content', styles.div)}>
        <Card type="card-primary">
          <div className="pure-g">
            <div>
              <QR value={activeAccount.publicKey} size={123} />
            </div>
            <div className={styles.msgContainer}>
              <h2 className={styles.msg}>SCAN ME</h2>
            </div>
          </div>
        </Card>

        <Card type="card-primary">
          <p className={styles.code}>
            {activeAccount.publicKey}
            {' '}
            <CopyText text={activeAccount.publicKey} />
          </p>
        </Card>
      </div>
    </>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(QRCode);
