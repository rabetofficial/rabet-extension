import shortid from 'shortid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card';
import shorter from '../../../helpers/shorter';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import CopyText from '../../components/CopyText';
import PageTitle from '../../components/PageTitle';
import sendAction from '../../actions/operations/send';
import operationMapper from '../../utils/operationMapper';
import currentActiveAccount from '../../utils/activeAccount';

import styles from './styles.less';

const Confirm = ({ options, transaction }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    sendAction(navigate);
  };

  const { activeAccount } = currentActiveAccount();

  const networkStatus = options.network === 'MAINNET' ? 'success' : 'warn';
  const network = options.network === 'MAINNET' ? 'Main network' : 'Test network';

  const { operations, memo } = transaction;
  const operationsMapped = [];

  for (let i = 0; i < operations.length; i += 1) {
    operationsMapped.push(operationMapper(operations[i]));
  }

  return (
    <>
      <div className={classNames(styles.confirm, 'hidden-scroll content-scroll')}>
        <PageTitle status={networkStatus} statusTitle={network} />

        <div className="content">
          <p className={styles.source}>
            <span className={styles.sourceTitle}>Source account:</span>
            <span className={styles.sourceValue}>
              <CopyText
                text={activeAccount.publicKey}
                button={shorter(activeAccount.publicKey, 5)}
              />
            </span>
          </p>

          {operationsMapped.map((item, index) => (
            <div className={styles.box} key={shortid.generate()}>
              <Card type="card-secondary">
                {item.title && (
                  <h1 className={styles.title}>
                    #
                    {index + 1}
                    {item.title}
                  </h1>
                )}
                {item.info.map((info) => (
                  <div key={info.title}>
                    <h2
                      className={styles.valueTitle}
                      style={{ margin: !item.title && '0' }}
                    >
                      {info.title}
                    </h2>

                    <p className={styles.value}>
                      {isNaN(info.value) ? info.value : parseFloat(info.value, 10).toString()}
                    </p>
                    {info.error && (
                      <p className="error">
                        <span className="icon-exclamation-circle" />
                        {' '}
                        {info.error}
                      </p>
                    )}
                  </div>
                ))}
              </Card>
            </div>
          ))}

          {(memo.checked && memo.text) && (
            <Card type="card-secondary">
              <h1 className={styles.title}>Memo</h1>
              <p className={styles.value}>{memo.text}</p>
            </Card>
          )}
        </div>
      </div>
      <div className={classNames('pure-g justify-end', styles.buttons)}>
        <Button
          variant="btn-default"
          size="btn-medium"
          content="Reject"
          onClick={() => {
            navigate(
              route.homePage,
              {
                state: {
                  alreadyLoaded: true,
                },
              },
            );
          }}
        />

        <Button
          variant="btn-primary"
          size="btn-medium"
          content="Confirm"
          onClick={handleConfirm}
        />
      </div>
    </>
  );
};

export default connect((state) => ({
  options: state.options,
  transaction: state.transaction,
}))(Confirm);
