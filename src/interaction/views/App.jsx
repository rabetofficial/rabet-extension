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
      <Route exact path={route.ConfirmPage} element={<Confirm />} />
      <Route exact path={route.loginPage} element={<Login />} />
      <Route exact path={route.loadingNetworkPage} element={<LoadingNetwork />} />
      <Route exact path={route.contactPage} element={<ContactRequest />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
);
