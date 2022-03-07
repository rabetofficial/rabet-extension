import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import currentActiveAccount from 'popup/utils/activeAccount';
import removeAccountAction from 'popup/actions/accounts/remove';
import DeleteAccountComponent from 'popup/pageComponents/DeleteAccount';

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  const handleDelete = () => {
    const { activeAccount } = currentActiveAccount();
    removeAccountAction(activeAccount.publicKey, navigate);
  };

  return (
    <DeleteAccountComponent
      onClick={handleDelete}
      onCancel={handleCancel}
    >
      <Header />
      <ExtTitle title="Delete account" className=" mt-5 mx-4" />
    </DeleteAccountComponent>
  );
};

export default DeleteAccount;
