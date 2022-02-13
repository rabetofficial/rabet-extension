import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import PageTitle from 'popup/components/PageTitle';
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
      <PageTitle title="Delete account" />
    </DeleteAccountComponent>
  );
};

export default DeleteAccount;
