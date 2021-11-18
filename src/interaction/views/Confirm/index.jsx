import React from 'react';
import classNames from 'classnames';
import StellarSdk, { Transaction } from 'stellar-sdk';

import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import sampleImageSrc from '../../../assets/images/stellar.png';

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
    <div>
      <div className={styles.header}>
        <div className={styles.pageTitle}><PageTitle status="network" statusTitle={network} /></div>
        <div className="content">
          <div className={styles.img}>
            <img src={sampleImageSrc} alt="logo" />
          </div>
          <h1 className={styles.title}>Approve Transaction</h1>
          <a href="/" className={styles.link}>litemint.com</a>
          <div className={styles.account}>
            <div>Source account</div>
            <div className={styles.accountName}>Sam Smith</div>
          </div>
        </div>
      </div>
      <div className={classNames('content hidden-scroll', styles.contentScroll)}>
        {Array(2).fill(0).map((item) => (
          <div className={styles.card}>
            <div className={styles.cardTitle}>#1-Payment</div>
            <div className={styles.cardSubject}>Destination</div>
            <div className={styles.cardValue}>
              GAIQPP3FHGMYTW3WXRQJAZVRC4ZY2BM76FUFHXFCLMGXSYFGFEBCPOPG
            </div>
            <div className={styles.cardSubject}>Amount</div>
            <div className={styles.cardValue}>
              145 XLM
            </div>
          </div>
        ))}
      </div>
      <div className="content">
        <div className={classNames('pure-g justify-end', styles.buttons)}>
          <div className={classNames('pure-g justify-end', styles.buttons)}>
            <Button variant="btn-default" size="btn-medium" content="Reject" onClick={handleReject} />

            <Button variant="btn-primary" size="btn-medium" content="Confirm" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
