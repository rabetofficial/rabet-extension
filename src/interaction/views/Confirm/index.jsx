import classNames from 'classnames';
import React from 'react';
import StellarSdk, { Transaction } from 'stellar-sdk';

import Button from '../../components/Button';
import shorter from '../../../helpers/shorter';
import CopyText from '../../components/CopyText';
import PageTitle from '../../components/PageTitle';
import Operations from '../../components/Operations';

import styles from './styles.less';

const Confirm = () => {
  const xdr = global.sessionStorage.getItem('xdr');
  const host = global.sessionStorage.getItem('host');
  const title = global.sessionStorage.getItem('title');
  const network = global.sessionStorage.getItem('network');
  const publicKey = global.sessionStorage.getItem('accountPublicKey');

  const handleReject = () => {
    global.chrome.runtime.sendMessage({
      type: 'RABET_EXTENSION_SIGN_XDR_RESPONSE',
      id: global.sessionStorage.getItem('generatedId'),
      result: 'reject',
      detail: {
        host,
        title,
      },
      xdr: {
        xdr,
        network,
      },
    });
  };

  const handleConfirm = () => {
    global.chrome.runtime.sendMessage({
      type: 'RABET_EXTENSION_SIGN_XDR_RESPONSE',
      id: global.sessionStorage.getItem('generatedId'),
      result: 'confirm',
      detail: {
        host,
        title,
      },
      xdr: {
        xdr,
        network,
      },
    });
  };

  const handleClose = () => {
    global.chrome.runtime.sendMessage({
      type: 'RABET_EXTENSION_SIGN_XDR_RESPONSE',
      id: global.sessionStorage.getItem('generatedId'),
      result: 'close',
    });
  };

  let transaction;

  try {
    const obj = StellarSdk.xdr.TransactionEnvelope.fromXDR(xdr, 'base64');
    transaction = new Transaction(obj, StellarSdk.Networks.PUBLIC);
  } catch (e) {
    return (
      <>
        <div className={classNames(styles.confirm, 'hidden-scroll content-scroll')}>
          <PageTitle status="Confirm" statusTitle="network" title={network} />

          <div className="content">
            <p>Invalid XDR</p>
          </div>

          <div className={classNames('pure-g', styles.buttons)}>
            <Button
              variant="btn-primary"
              size="btn-medium"
              content="Close"
              onClick={handleClose}
            />
          </div>
        </div>
      </>
    );
  }

  const { _operations: operations, _source: source } = transaction;

  return (
    <>
      <div className={classNames(styles.confirm, 'hidden-scroll content-scroll')}>
        <PageTitle status="Confirm" statusTitle="network" title={network} />

        <div className="content">
          <p className={styles.source}>
            <span className={styles.sourceTitle}>Source account:</span>

            <span className={styles.sourceValue}>
              <CopyText text={source} button={shorter(publicKey, 5)} />
            </span>
          </p>

          <Operations operations={operations} />
        </div>
      </div>
      <div className={classNames('pure-g justify-end', styles.buttons)}>
        <Button variant="btn-default" size="btn-medium" content="Reject" onClick={handleReject} />

        <Button variant="btn-primary" size="btn-medium" content="Confirm" onClick={handleConfirm} />
      </div>
    </>
  );
};

export default Confirm;
