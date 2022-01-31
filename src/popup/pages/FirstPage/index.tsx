import React from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/Logo';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';
import Layout from '../../components/Layout';

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
            navigate(route.createWalletPage);
          }}
        />

        <Button
          type="button"
          variant="outlined"
          size="medium"
          content="Import Wallet"
          onClick={() => {
            navigate(route.restoreWalletPage);
          }}
        />
      </div>
    </Layout>
  );
};

export default FirstPage;
