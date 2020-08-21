import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import QR from 'qrcode.react';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import Card from 'Root/components/Card';
import styles from './styles.less';
import CopyText from '../../components/CopyText';

const QRCode = props => {
  return (
      <>
        <Header/>
        <PageTitle title="Receive" />
        <div className={ classNames('content', styles.div) }>
          <Card type="card-primary">
            <div className="pure-g">
              <div>
                <QR value="NTBoWouUgEwfaZ3ExNrFsWEpFUJouUgEwfaZ3ExNrFsWEpFUJW5" size={ 123 }/>
              </div>
              <div className={ styles.msgContainer }>
                <h2 className={ styles.msg }>SCAN ME</h2>
              </div>
            </div>
          </Card>
          <Card type="card-primary">
            <p className={styles.code}>
              NTBoWouUgEwfaZ3ExNrFsWEpFUJouUgEwfaZ3ExNrFsWEpFUJW5{' '}
              <CopyText text="NTBoWouUgEwfaZ3ExNrFsWEpFUJouUgEwfaZ3ExNrFsWEpFUJW5" />
            </p>
          </Card>
        </div>
      </>
  );
};

QRCode.propTypes = {

};

export default QRCode;
