import React from 'react';
import { Navigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import checkOffline from 'popup/utils/checkOffline';
import useTypedSelector from 'popup/hooks/useTypedSelector';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isOnLine = checkOffline();
  const user = useTypedSelector((store) => store.user);

  if (!isOnLine) {
    return <Navigate to={RouteName.OfflineMode} />;
  }

  if (!user.logged) {
    if (user.registered) {
      return <Navigate to={RouteName.Login} />;
    }

    return <Navigate to={RouteName.Introduction} />;
  }

  return children;
};

export default ProtectedRoute;
