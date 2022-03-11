import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import ScrollBar from 'popup/components/common/ScrollBar';
import SuccessfulSubmissionComponent from 'popup/components/SuccessfulSubmission';

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
    <ScrollBar isHidden>
      <Header />

      <div className="content">
        <ExtTitle
          className="mt-[20px] mb-[87px]"
          alreadyLoaded={false}
        />

        <div className="flex">
          <SuccessfulSubmissionComponent
            onClick={handleClick}
            message={state.message}
          />
        </div>
      </div>
    </ScrollBar>
  );
};

export default SuccessfulSubmission;
