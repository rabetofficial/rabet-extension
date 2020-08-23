import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import * as route from 'Root/staticRes/routes';

class ProtectedRoute extends Component {
  render() {
    const { user } = this.props;

    if (!user.logged) {
      if (user.registered) {
        return <Redirect to={route.loginPage} />
      }

      return <Redirect to={route.confirmLoginPage} />
    }

    return <Route {...this.props} />
  }
}

export default connect((state) => ({
  user: state.user,
}))(ProtectedRoute);
