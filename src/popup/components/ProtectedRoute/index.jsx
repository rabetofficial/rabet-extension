import { connect } from 'react-redux';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import * as route from '../../staticRes/routes';
import checkOffline from '../../utils/checkOffline';

const ProtectedRoute = ({ user, ...props }) => {
  const isOnLine = checkOffline();

  if (!isOnLine) {
    return <Navigate to={route.offlineModePage} />;
  }

  if (!user.logged) {
    if (user.registered) {
      return <Navigate to={route.loginPage} />;
    }

    return <Navigate to={route.confirmLoginPage} />;
  }

  return <Route {...props} />;
};

export default connect((state) => ({
  user: state.user,
}))(ProtectedRoute);
