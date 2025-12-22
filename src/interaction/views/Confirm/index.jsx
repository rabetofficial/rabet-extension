import classNames from 'classnames';
import { useState } from 'react';
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
  const messageText = global.sessionStorage.getItem('message');
  const network = global.sessionStorage.getItem('network');
  const name = global.sessionStorage.getItem('accountName');
  const publicKey = global.sessionStorage.getItem('accountPublicKey');
  const isSignMessage = !!messageText && !xdrText;
  const RES = isSignMessage
    ? 'RABET_EXTENSION_SIGN_MESSAGE_RESPONSE'
    : 'RABET_EXTENSION_SIGN_XDR_RESPONSE';

  const signTransactionData = {
    xdr: {
      xdrText,
      xdr: xdrText,
      network,
    },
  };

  const signMessageData = {
    message: {
      messageText,
      message: messageText,
    },
  };

  const responseData = isSignMessage ? signMessageData : signTransactionData;

  const handleReject = () => {
    global.chrome.runtime.sendMessage({
      type: RES,
      id: global.sessionStorage.getItem('generatedId'),
      result: 'reject',
      detail: {
        host,
        title,
      },
      ...responseData,
    });
  };

  const handleConfirm = () => {
    global.chrome.runtime.sendMessage({
      type: RES,
      id: global.sessionStorage.getItem('generatedId'),
      result: 'confirm',
      detail: {
        host,
        title,
      },
      ...responseData,
    });
  };

  const handleClose = () => {
    global.chrome.runtime.sendMessage({
      type: RES,
      id: global.sessionStorage.getItem('generatedId'),
      result: 'close',
    });
  };

  const shownName = name.length < 12 ? name : `${name.slice(0, 13)}...`;

  if (isSignMessage) {
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.pageTitle}>
            <PageTitle status="Sign Message" statusTitle="" />
          </div>
          <div className="content">
            <div className={styles.img}>
              <img
                src={`https://img.logo.dev/${host}?token=pk_NPIE3R4ASi6FbsyheABqjw`}
                alt={host}
                className={!isImageLoaded ? 'image-error' : ''}
                onError={() => {
                  setIsImageLoaded(false);
                }}
              />

              {!isImageLoaded ? (
                <div className={styles.hostStyle}>{host[0].toUpperCase()}</div>
              ) : (
                ''
              )}
            </div>
            <h1 className={styles.title}>Sign Message</h1>
            <a href="#" className={styles.link}>
              {host}
            </a>
            <div className={styles.account}>
              <div>Source account</div>
              <div className={styles.accountName} style={{ color: 'white' }}>
                <CopyText text={publicKey} button={shownName} />
              </div>
            </div>
          </div>
        </div>

        <div className={classNames('content hidden-scroll', styles.contentScroll)}>
          <p>Message:</p>
          <p>{messageText}</p>
        </div>

        <div className="content">
          <div className={classNames('pure-g justify-end', styles.buttons)}>
            <div className={classNames('pure-g justify-end', styles.buttons)}>
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
  }

  let transaction;

  try {
    const obj = xdr.TransactionEnvelope.fromXDR(xdrText, 'base64');
    transaction = new Transaction(obj, Networks.PUBLIC);
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

  const { _operations: operations } = transaction;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.pageTitle}>
          <PageTitle status="network" statusTitle={network} />
        </div>
        <div className="content">
          <div className={styles.img}>
            <img
              src={`https://img.logo.dev/${host}?token=pk_NPIE3R4ASi6FbsyheABqjw`}
              alt={host}
              className={!isImageLoaded ? 'image-error' : ''}
              onError={() => {
                setIsImageLoaded(false);
              }}
            />

            {!isImageLoaded ? (
              <div className={styles.hostStyle}>{host[0].toUpperCase()}</div>
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

      <div className={classNames('content hidden-scroll', styles.contentScroll)}>
        <Operations operations={operations} />
      </div>

      <div className="content">
        <div className={classNames('pure-g justify-end', styles.buttons)}>
          <div className={classNames('pure-g justify-end', styles.buttons)}>
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
