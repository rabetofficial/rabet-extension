import React from 'react';
import { Navigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import checkOffline from 'popup/utils/checkOffline';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const UnprotectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const isOnLine = checkOffline();
  const [user, accounts] = useTypedSelector((store) => [
    store.user,
    store.accounts,
  ]);

  if (!isOnLine) {
    return <Navigate to={RouteName.OfflineMode} />;
  }

  if (user.logged && user.registered && accounts.length) {
    return <Navigate to={RouteName.Home} />;
  }

  return children;
};

export default UnprotectedRoute;
