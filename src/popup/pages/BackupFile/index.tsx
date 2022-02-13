import React from 'react';

import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import BackupFileComponent from 'popup/pageComponents/BackupFile';

const BackupFile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RouteName.Home);
  };
  const handleClose = () => {
    navigate(RouteName.First);
  };
  return (
    <>
      <BackupFileComponent
        onClick={handleClick}
        onClose={handleClose}
      >
        <PageTitle title="Backup" />
      </BackupFileComponent>
    </>
  );
};

export default BackupFile;
