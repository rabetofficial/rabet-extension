import { connect } from 'react-redux';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as route from '../../staticRes/routes';
import checkOffline from '../../helpers/checkOffline';

const ProtectedRoute = ({ user, ...props }) => {
  const isOnLine = checkOffline();

  if (!isOnLine) {
    return <Redirect to={route.offlineModePage} />;
  }

  if (!user.logged) {
    if (user.registered) {
      return <Redirect to={route.loginPage} />;
    }

    return <Redirect to={route.confirmLoginPage} />;
  }

  return <Route {...props} />;
};

export default connect((state) => ({
  user: state.user,
}))(ProtectedRoute);
