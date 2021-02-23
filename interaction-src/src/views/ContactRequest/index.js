import classNames from 'classnames';
import React, { Component } from 'react';

import shorter from 'Root/helpers/shorter';
import Button from 'Root/components/Button';
import shortName from 'Root/helpers/shortName';
import smallDetail from 'Root/helpers/smallDetail';

import styles from './styles.less';

class ContactRequest extends Component {
  render() {
    const host = global.sessionStorage.getItem('host');
    const title = global.sessionStorage.getItem('title');
    const name = global.sessionStorage.getItem('accountName');
    const publicKey = global.sessionStorage.getItem('accountPublicKey');

    const handleReject = () => {
      global.chrome.runtime.sendMessage({
        type: 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE',
        id: global.sessionStorage.getItem('generatedId'),
        result: 'reject',
        detail: {
          host,
          title,
        },
        activeAcconut: {
          name,
          publicKey,
        },
      });
    };

    const handleConnect = () => {
      global.chrome.runtime.sendMessage({
        type: 'RABET_EXTENSION_CONTACT_REQUEST_RESPONSE',
        id: global.sessionStorage.getItem('generatedId'),
        result: 'confirm',
        detail: {
          host,
          title,
        },
        activeAcconut: {
          name,
          publicKey,
        },
      });
    };

    return (
      <div className={styles.page}>
        <div className="content">
          <h6 className={styles.contact}>Connect Request</h6>
          <div className={styles.step}>
            <div className="pure-g step-container">
              <div className="step step-one step-one-container flex-parent" style={{ alignItems: 'center' }}>
                <img src={`https://s2.googleusercontent.com/s2/favicons?domain=${host}`} width="24" style={{ height: 'auto' }} alt={host} />
              </div>
              <div className="step step-two">{shortName(name)}</div>
              <div className="icon-checkmark step-checked" />
            </div>
            <div className="pure-g step-name-container">
              <div className="pure-u-4-24">
                <p className="step-name">{smallDetail(title, 15)}</p>
                <p className="step-detail">{host}</p>
              </div>
              <div className="pure-u-5-24">
                <p className="step-name">{name}</p>
                <p className="step-detail">{shorter(publicKey, 5)}</p>
              </div>
            </div>
          </div>
          <h1 className={styles.title}>{smallDetail(title, 15)} would like to connect to your account</h1>
          <div className={classNames('pure-g', styles.buttons)}>
            <Button variant="btn-default" size="btn-medium" content="Reject" onClick={handleReject} />

            <Button
              type="submit"
              variant="btn-primary"
              size="btn-medium"
              content="Connect"
              onClick={handleConnect}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ContactRequest;
