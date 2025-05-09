import classNames from 'classnames';
import React, { useState } from 'react';
import { xdr, Transaction, Networks } from '@stellar/stellar-sdk';

import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import Operations from '../../components/Operations';
import CopyText from '../../components/CopyText';

import styles from './styles.less';

const Confirm = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const host = global.sessionStorage.getItem('host');
  const title = global.sessionStorage.getItem('title');
  const xdrText = global.sessionStorage.getItem('xdr');
  const network = global.sessionStorage.getItem('network');
  const name = global.sessionStorage.getItem('accountName');
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
        xdrText,
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
        xdr: xdrText,
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
    const obj = xdr.TransactionEnvelope.fromXDR(xdrText, 'base64');
    transaction = new Transaction(obj, Networks.PUBLIC);
  } catch (e) {
    return (
      <>
        <div
          className={classNames(
            styles.confirm,
            'hidden-scroll content-scroll',
          )}
        >
          <PageTitle
            status="Confirm"
            statusTitle="network"
            title={network}
          />

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

  const { _operations: operations } = transaction;

  const shownName =
    name.length < 12 ? name : `${name.slice(0, 13)}...`;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <PageTitle status="network" statusTitle={network} />
        </div>
        <div className="content">
          <div className={styles.img}>
            <img
              src={`https://logo.clearbit.com/${host}`}
              alt={host}
              className={!isImageLoaded ? 'image-error' : ''}
              onError={() => {
                setIsImageLoaded(false);
              }}
            />

            {!isImageLoaded ? (
              <div className={styles.hostStyle}>
                {host[0].toUpperCase()}
              </div>
            ) : (
              ''
            )}
          </div>
          <h1 className={styles.title}>Approve Transaction</h1>
          <a href="#" className={styles.link}>
            {host}
          </a>
          <div className={styles.account}>
            <div>Source account</div>
            <div className={styles.accountName}>
              <CopyText text={publicKey} button={shownName} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'content hidden-scroll',
          styles.contentScroll,
        )}
      >
        <Operations operations={operations} />
      </div>

      <div className="content">
        <div
          className={classNames('pure-g justify-end', styles.buttons)}
        >
          <div
            className={classNames(
              'pure-g justify-end',
              styles.buttons,
            )}
          >
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Reject"
              onClick={handleReject}
            />

            <Button
              variant="btn-primary"
              size="btn-medium"
              content="Confirm"
              onClick={handleConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
