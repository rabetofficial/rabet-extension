import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Header from 'popup/components/common/Header';
import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import SuccessfulSubmissionComponent from 'popup/pageComponents/SuccessfulSubmission';

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

  const { message } = state;

  return (
    <>
      <Header />

      <PageTitle alreadyLoaded={false} />
      <SuccessfulSubmissionComponent
        onClick={handleClick}
        message={message}
      />
    </>
  );
};

export default SuccessfulSubmission;
