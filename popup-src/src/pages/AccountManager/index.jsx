import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as route from '../../staticRes/routes';

const AccountManager = ({ accounts }) => {
  if (!accounts.length) {
    return <Redirect to={route.firstPage} />;
  }

  return <Redirect to={route.homePage} />;
};

export default connect((state) => ({
  accounts: state.accounts,
}))(AccountManager);
