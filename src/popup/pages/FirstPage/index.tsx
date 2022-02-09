import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import Layout from 'popup/components/Layout';

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <Layout isDashboard={false}>
      <Logo />

      <div className="mt-[70px]">
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
      </div>
    </Layout>
  );
};

export default FirstPage;
