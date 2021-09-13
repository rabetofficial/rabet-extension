import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import Card from '../../components/Card';
import CopyText from '../../components/CopyText';

import styles from './styles.less';

const PrivateKey = (props) => {
  const { accounts, history } = props;

  const handleClick = () => {
    history.push({
      pathname: route.homePage,
      state: {
        alreadyLoaded: true,
      },
    });
  };

  let activeAccount;

  for (let i = 0; i < accounts.length; i += 1) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      break;
    }
  }

  if (!activeAccount) {
    [activeAccount] = accounts;
  }

  return (
    <div className={styles.note}>
      <Header />

      <PageTitle title="Show private key" />

      <div className="content">
        <div className={styles.msg}>
          <span>Do not lose it!</span>
          {' '}
          It cannot be recovered if you lose it.
          {' '}
          <br />
          <span>Do not share it!</span>
          {' '}
          Your funds will be stolen if you use this file on a phishing site.
        </div>
        <div className={classNames('label-primary', styles.label)}>Private Key</div>
        <div className={styles.box}>
          <Card type="card-primary">
            {activeAccount.privateKey}
            <div className={styles.copy}>
              <CopyText copyButton text={activeAccount.privateKey} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

PrivateKey.propTypes = {

};

export default connect((state) => ({
  accounts: state.accounts,
}))(PrivateKey);
