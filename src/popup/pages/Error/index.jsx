import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';

import styles from './styles.less';

const Error = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(
      route.homePage,
      {
        state: {
          alreadyLoaded: true,
        },
      },
    );
  };

  return (
    <>
      <Header />

      <PageTitle />

      <div>
        <NoteCard
          title="Error"
          message={state.message || 'ERROR!'}
          btnText="Got it"
          icon="icon-exclamation-triangle"
          iconClass={styles.icon}
          handleClick={handleClick}
        />
      </div>
    </>
  );
};

Error.propTypes = {

};

export default Error;
