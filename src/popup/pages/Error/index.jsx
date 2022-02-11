import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Error from '../../pageComponents/Error';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(route.homePage, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <Header />

      <PageTitle />

      <Error handleClick={handleClick} error={state.message} />
    </>
  );
};

export default ErrorPage;
