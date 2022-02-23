import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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
    <Container>
      <BackupFileComponent
        onClick={handleClick}
        onClose={handleClose}
      >
        <PageTitle title="Backup" padding="0" />
      </BackupFileComponent>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  @media (max-width: 360px) {
    height: auto;
    margin-top: 18px;
  }
`;
export default BackupFile;
