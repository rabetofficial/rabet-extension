import React from 'react';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/Layout';
import CreateWalletComponent from 'popup/pageComponents/CreateWallet';

const CreateWallet = () => (
  <Layout isDashboard={false}>
    <CreateWalletComponent
      onCancel={() => console.log('hi')}
      onSubmit={() => console.log('hi')}
    >
      <Logo />
    </CreateWalletComponent>
  </Layout>
);

export default CreateWallet;
