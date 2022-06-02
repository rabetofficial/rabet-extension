import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Confirm from './Confirm';
import LoadingNetwork from './LoadingNetwork';
import ContactRequest from './ContactRequest';
import * as route from '../staticRes/routes';

import '../styles/base.less';

export default () => (
  <div className="layout">
    <Routes>
      <Route path={route.ConfirmPage} element={<Confirm />} />
      <Route path={route.loginPage} element={<Login />} />
      <Route
        path={route.loadingNetworkPage}
        element={<LoadingNetwork />}
      />
      <Route path={route.contactPage} element={<ContactRequest />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
);
