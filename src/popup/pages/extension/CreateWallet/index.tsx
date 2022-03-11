import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import CreateWalletComponent from 'popup/components/CreateWallet';

const CreateWallet = () => {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  return (
    <>
      <Header />

      <CreateWalletComponent
        isExtension
        onCancel={handleCancel}
        onSubmit={() => {}}
      >
        <ExtTitle title="Create wallet" />
      </CreateWalletComponent>
    </>
  );
};

export default CreateWallet;
