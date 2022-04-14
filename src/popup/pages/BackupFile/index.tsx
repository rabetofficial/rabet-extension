import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import BackupFileComponent from 'popup/components/BackupFile';

const BackupFile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RouteName.Home);
  };

  return (
    <Container>
      <BackupFileComponent onClick={handleClick}>
        <PageTitle
          padding="0"
          title="Backup"
          showMultiplyIcon={false}
        />
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
