import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';
import currentActiveAccount from '../../helpers/activeAccount';

import styles from './styles.less';

const PrivateKey = ({ history }) => {
  const handleClick = () => {
    history.push({
      pathname: route.homePage,
      state: {
        alreadyLoaded: true,
      },
    });
  };

  const { activeAccount } = currentActiveAccount();

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

export default connect((state) => ({
  accounts: state.accounts,
}))(PrivateKey);
