import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import * as route from '../../staticRes/routes';

const AccountManager = ({ accounts }) => {
  if (!accounts.length) {
    return <Navigate to={route.firstPage} />;
  }

  return <Navigate to={route.homePage} />;
};

export default connect((state) => ({
  accounts: state.accounts,
}))(AccountManager);
