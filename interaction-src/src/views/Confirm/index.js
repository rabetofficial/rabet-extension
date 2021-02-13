import shortid from 'shortid';
import classNames from 'classnames';
import React, {Component} from 'react';
import { parse } from 'xdr-parser';

import shorter from 'Root/helpers/shorter';
import Card from 'Root/components/Card';
import Button from 'Root/components/Button';
import CopyText from 'Root/components/CopyText';
import PageTitle from 'Root/components/PageTitle';
import operationMapper from 'Root/helpers/operationMapper';

import styles from './styles.less';

class Confirm extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const xdr = global.sessionStorage.getItem('xdr');
    const network = global.sessionStorage.getItem('network');

    let parsed;

    try {
      parsed = parse(xdr);
    } catch (e) {
      return (
          <>
            <div className={ classNames(styles.confirm, 'hidden-scroll content-scroll') }>
              <PageTitle status="Confirm" statusTitle="network" title={network} />

              <div className="content">
                <p>Invalid XDR</p>
              </div>
            </div>
          </>
      );
    }

    const operationsMapped = [];

    for (const operation of parsed.operations) {
      operationsMapped.push(operationMapper(operation));
    }

    return (
        <>
          <div className={ classNames(styles.confirm, 'hidden-scroll content-scroll') }>
            <PageTitle status="Confirm" statusTitle="network" title={network} />

            <div className="content">
              <p className={ styles.source }>
                <span className={ styles.sourceTitle }>Source account:</span>
                <span className={ styles.sourceValue }>
                <CopyText text={parsed.sourceAccount} button={shorter(parsed.sourceAccount, 10)} />
                </span>
              </p>

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

              {operationsMapped.map((item, index) => (
                <div className={ styles.box } key={shortid.generate()}>
                  <Card type="card-secondary">
                    <h1 className={styles.title}>#{index + 1} {item.title}</h1>
                    {item.info && item.info.map((info) => (
                        <div key={ shortid.generate() }>
                          <h2
                            className={ styles.valueTitle }
                            style={ {margin: !item.title && '0'} }
                          >{info.title}</h2>
                          <p className={ styles.value }>
                          {isNaN(info.value) ? info.value : parseFloat(info.value, 10).toString()}
                          </p>
                          {info.error &&
                          <p className="error">
                            <span className="icon-exclamation-circle"/>{' '}{info.error}
                          </p>
                          }
                        </div>
                    ))}
                  </Card>
                </div>
              ))}

              <Card type="card-secondary">
                <h1 className={styles.title}>Memo</h1>
                <p className={ styles.value }>
                  {parsed.memo && (
                    <span>{parsed.memo.value} [{parsed.memo.type}]</span>
                  )}
                </p>
              </Card>
            </div>
          </div>
          <div className={ classNames('pure-g justify-end', styles.buttons) }>
            <Button
              variant="btn-default"
              size="btn-medium"
              content="Reject"
              onClick={this.handleReject}
            />

            <Button
              variant="btn-primary"
              size="btn-medium"
              content="Confirm"
              onClick={this.handleConfirm}
            />
          </div>
        </>
    );
  }
}

export default Confirm;
