import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'popup/components/common/Header';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import NoteCard from 'popup/pageComponents/NoteCard';
import CopyText from 'popup/components/common/CopyText';
import shareIcon from 'popup/../assets/images/share-arrow.svg';
import createTab from 'popup/utils/createTab';
import explorer from 'popup/utils/horizon/getTransaction';

import styles from './styles.less';

const SuccessfulSubmission = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: false,
      },
    });
  };

  const { hash } = state;

  const copyText = (
    <>
      <CopyText text={hash} button={hash} />
      <a
        className={styles.shareLink}
        onClick={() => {
          createTab(explorer(hash));
        }}
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
