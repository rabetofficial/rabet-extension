import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';
import CopyText from '../../components/CopyText';
import shareIcon from '../../assets/images/share-arrow.svg';
import createTab from '../../helpers/createTab';
import explorer from '../../helpers/horizon/getTransaction';

import styles from './styles.less';

const SuccessfulSubmission = ({ history }) => {
  const handleClick = () => {
    history.push({
      pathname: route.homePage,
      state: {
        alreadyLoaded: false,
      },
    });
  };

  const { hash } = history.location.state;

  const copyText = (
    <>
      <CopyText text={hash} button={hash} />
      <a
        className={styles.shareLink}
        onClick={() => { createTab(explorer(hash)); }}
      >
        <img src={shareIcon} alt="icon" />
      </a>
    </>
  );

  return (
    <>
      <Header />

      <PageTitle alreadyLoaded={false} />
      <NoteCard
        title="Transaction Sent"
        message={hash ? copyText : 'SUCCESS!'}
        btnText="OK"
        icon="icon-checkmark"
        iconClass={styles.icon}
        handleClick={handleClick}
      />
    </>
  );
};

export default withRouter(SuccessfulSubmission);
