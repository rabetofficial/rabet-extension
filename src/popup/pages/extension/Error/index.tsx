import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Error from 'popup/components/Error';
import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';

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

      <ExtTitle title="Receive" className="content mt-[20px]" />

      <div className="flex my-auto">
        <Error onClick={handleClick} message={state.message} />
      </div>
    </>
  );
};

export default ErrorPage;
