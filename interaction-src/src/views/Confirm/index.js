import classNames from 'classnames';
import React, { Component } from 'react';
import StellarSdk, { Transaction } from 'stellar-sdk';

import shorter from 'Root/helpers/shorter';
import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import CopyText from 'Root/components/CopyText';
import PageTitle from 'Root/components/PageTitle';
import Operations from 'Root/components/Operations';

import styles from './styles.less';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleReject() {
    const host = global.sessionStorage.getItem('host');
    const title = global.sessionStorage.getItem('title');
    const xdr = global.sessionStorage.getItem('xdr');
    const network = global.sessionStorage.getItem('network');

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
  }

  handleConfirm() {
    const host = global.sessionStorage.getItem('host');
    const title = global.sessionStorage.getItem('title');
    const xdr = global.sessionStorage.getItem('xdr');
    const network = global.sessionStorage.getItem('network');

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
  }

  handleClose() {
    global.chrome.runtime.sendMessage({
      type: 'RABET_EXTENSION_SIGN_XDR_RESPONSE',
      id: global.sessionStorage.getItem('generatedId'),
      result: 'close',
    });
  }

  render() {
    const publicKey = global.sessionStorage.getItem('accountPublicKey');
    const xdr = global.sessionStorage.getItem('xdr');
    const network = global.sessionStorage.getItem('network');

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
              <Button variant="btn-primary" size="btn-medium" content="Close" onClick={this.handleClose} />
            </div>
          </div>
        </>
      );
    }

    const operations = transaction._operations;

    return (
      <>
        <div className={classNames(styles.confirm, 'hidden-scroll content-scroll')}>
          <PageTitle status="Confirm" statusTitle="network" title={network} />

          <div className="content">
            <p className={styles.source}>
              <span className={styles.sourceTitle}>Source account:</span>

              <span className={styles.sourceValue}>
                <CopyText text={transaction._source} button={shorter(publicKey, 5)} />
              </span>
            </p>

            {/*
                <p className={ styles.source } style={{ marginTop: '10px' }}>
                <span className={ styles.sourceTitle }>Fee:</span>
                <span className={ styles.sourceValue }>
                <CopyText text={parsed.fee} button={parsed.fee.toString()} />
                </span>
                </p>

                <p className={ styles.source } style={{ marginTop: '10px' }}>
                <span className={ styles.sourceTitle }>Sequence number:</span>
                <span className={ styles.sourceValue }>
                <CopyText text={parsed.seqNum} button={parsed.seqNum.toString()} />
                </span>
                </p>
              */}

            <Operations operations={transaction._operations} />

            {/* <Card type="card-secondary">
              <h1 className={styles.title}>Memo</h1>
              <p className={styles.value}>
                {parsed.memo && (
                  <span>
                    {parsed.memo.value} [{parsed.memo.type}]
                  </span>
                )}
              </p>
            </Card> */}
          </div>
        </div>
        <div className={classNames('pure-g justify-end', styles.buttons)}>
          <Button variant="btn-default" size="btn-medium" content="Reject" onClick={this.handleReject} />

          <Button variant="btn-primary" size="btn-medium" content="Confirm" onClick={this.handleConfirm} />
        </div>
      </>
    );
  }
}

export default Confirm;
