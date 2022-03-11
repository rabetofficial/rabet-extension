import React from 'react';
import Header from 'popup/components/common/Header';
import CreateWalletComponent from 'popup/components/CreateWallet';
import ExtTitle from 'popup/components/common/Title/Ext';

const CreateWallet = () => {
  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };
  <>
    <Header />
    <CreateWalletComponent isExtension onCancel={handleCancel}>
      <ExtTitle title="Create wallet" />
    </CreateWalletComponent>
  </>;
};
export default CreateWallet;
