import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import * as route from 'Root/staticRes/routes';

class AccountManager extends Component {
  render() {
    const { accounts } = this.props;

    if (!accounts.length) {
      return <Redirect to={route.firstPage} />
    }

    return <Redirect to={route.homePage} />;
  }
}

export default connect((state) => ({
  accounts: state.accounts,
}))(AccountManager);
