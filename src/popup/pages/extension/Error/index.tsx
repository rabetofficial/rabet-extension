import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Error from 'popup/components/Error';
import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';

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
    <div style={{ maxWidth: '360px' }}>
      <ScrollBar isHidden>
        <Header />

        <div className="content">
          <ExtTitle
            className="mt-[20px] mb-[87px]"
            alreadyLoaded={false}
          />

          <div style={{ width: '328px' }}>
            <Error onClick={handleClick} message={state.message} />
          </div>
        </div>
      </ScrollBar>
    </div>
  );
};

export default ErrorPage;
