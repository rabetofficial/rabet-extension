import React from 'react';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/Layout';
import RestoreWalletComponent from 'popup/pageComponents/RestoreWallet';

const RestoreWallet = () => (
  <Layout isDashboard={false}>
    <RestoreWalletComponent>
      <Logo />
    </RestoreWalletComponent>
  </Layout>
);

export default RestoreWallet;
