import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Logo from 'popup/components/Logo';
import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import Layout from 'popup/components/common/Layouts/BaseLayout';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <Layout isDashboard={false}>
      <Logo />
      <ButtonContainer>
        <Button
          type="button"
          variant="primary"
          size="medium"
          content="Create Wallet"
          style={{ marginBottom: '30px' }}
          onClick={() => {
            navigate(RouteName.CreateWallet);
          }}
        />

        <Button
          type="button"
          variant="outlined"
          size="medium"
          content="Import Wallet"
          onClick={() => {
            navigate(RouteName.RestoreWallet);
          }}
        />
      </ButtonContainer>
    </Layout>
  );
};
const ButtonContainer = styled.div`
  margin-top: 69px;
  @media (max-width: 360px) {
    margin-top: 80px;
    font-weight: 500;
    font-size: 18px;
  }
`;
export default FirstPage;
