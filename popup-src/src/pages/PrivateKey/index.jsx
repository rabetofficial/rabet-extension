import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';

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

      <PageTitle />

      <NoteCard
        btnText="OK"
        icon="icon-key"
        title="Your private key"
        iconClass={styles.icon}
        message={activeAccount.privateKey}
        handleClick={handleClick}
        copy
      />
    </div>
  );
};

PrivateKey.propTypes = {

};

export default connect(state => ({
  accounts: state.accounts,
}))(PrivateKey);
