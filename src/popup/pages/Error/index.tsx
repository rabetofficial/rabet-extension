import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'popup/components/common/Header';
import Error from 'popup/pageComponents/Error';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClick = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <Header />

      <PageTitle />
      <div className="flex my-auto">
        <Error handleClick={handleClick} error={state.message} />
      </div>
    </>
  );
};

export default ErrorPage;
