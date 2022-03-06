import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
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

  return (
    <>
      <Header />

      <ExtTitle
        title="Receive"
        className="content mt-[20px]"
        alreadyLoaded={false}
      />

      <div className="flex my-auto">
        <SuccessfulSubmissionComponent
          onClick={handleClick}
          message={state.message}
        />
      </div>
    </>
  );
};

export default SuccessfulSubmission;
