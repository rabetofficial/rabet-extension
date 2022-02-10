import React from 'react';
import { Navigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const AccountManager = () => {
  const accounts = useTypedSelector((store) => store.accounts);

  console.log(accounts);

  if (!accounts.length) {
    return <Navigate to={RouteName.First} />;
  }

  return <Navigate to={RouteName.Home} />;
};

export default AccountManager;
