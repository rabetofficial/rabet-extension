import classNames from 'classnames';
import React from 'react';

import Button from '../../components/Button';
import shortName from '../../../helpers/shortName';

import styles from './styles.less';

const ContactRequest = () => {
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
    <div className="content">
      <h6 className={styles.contact}>Connect Request</h6>

      <ul className={styles.steps}>
        <li>
          <div className={styles['step-value']}>
            <img
              src={`https://logo.clearbit.com/${host}?size=55`}
              style={{ height: 'auto' }}
              alt={host}
            />
          </div>
          <div className={styles['step-label']}>{host}</div>
        </li>

        <div className="icon-checkmark" />

        <li>
          <div className={styles['step-value']}>
            {shortName(name)}
          </div>
          <div className={styles['step-label']}>{name}</div>
        </li>
      </ul>

      <h1 className={styles.title}>
        <a
          style={{
            color: '#3277ff',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
          href={`https://${host}`}
          target="_blank"
          rel="noreferrer"
        >
          {host}
        </a>{' '}
        would like to connect to your account
      </h1>

      <div className={classNames('pure-g', styles.buttons)}>
        <Button
          variant="btn-default"
          size="btn-medium"
          content="Cancel"
          onClick={handleReject}
        />

        <Button
          type="submit"
          variant="btn-primary"
          size="btn-medium"
          content="Connect"
          onClick={handleConnect}
        />
      </div>
    </div>
  );
};

export default ContactRequest;
