import React from 'react';
import { connect } from 'react-redux';

import Header from 'Root/components/Header';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import NoteCard from 'Root/pageComponents/NoteCard';

import styles from './styles.less';

const PrivateKey = props => {
  const { accounts } = props;

  let activeAccount;

  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].active) {
      activeAccount = accounts[i];
      break;
    }
  }

  if (!activeAccount) {
    activeAccount = accounts[0];
  }

  return (
      <div className={ styles.note }>
        <Header/>

        <PageTitle />

        <NoteCard
          btnText="OK"
          icon="icon-key"
          title="Your private key"
          iconClass={ styles.icon }
          message={activeAccount.privateKey}
          handleClick={() => { props.history.push(route.homePage) }}
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
