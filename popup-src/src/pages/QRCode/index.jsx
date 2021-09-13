import React from 'react';
import QR from 'qrcode.react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import Card from '../../components/Card';
import Header from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import CopyText from '../../components/CopyText';

import styles from './styles.less';

const QRCode = (props) => {
  const { accounts } = props;

  let activeAccount;

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      break;
    }
  }

  if (!activeAccount) {
    [activeAccount] = accounts;
  }

  const test = activeAccount.publicKey;

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
            <div className={styles.copy}>
              <CopyText copyButton text={test} />
            </div>
          </p>
        </Card>
      </div>
    </>
  );
};

QRCode.propTypes = {

};

export default connect((state) => ({
  accounts: state.accounts,
}))(QRCode);
