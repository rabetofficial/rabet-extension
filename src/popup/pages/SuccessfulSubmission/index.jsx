import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';
import CopyText from '../../components/CopyText';
import shareIcon from '../../../assets/images/share-arrow.svg';
import createTab from '../../utils/createTab';
import explorer from '../../utils/horizon/getTransaction';

import styles from './styles.less';

const SuccessfulSubmission = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(
      route.homePage,
      {
        alreadyLoaded: false,
      },
    );
  };

  const { hash } = state;

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

export default SuccessfulSubmission;
