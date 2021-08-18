import { connect } from 'react-redux';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as route from '../../staticRes/routes';

const ProtectedRoute = ({ user, ...props }) => {
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
