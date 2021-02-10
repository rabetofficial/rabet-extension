import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as route from 'Root/staticRes/routes';
import Confirm from "./Confirm";
import Login from "./Login";
import LoadingNetwork from "./LoadingNetwork";
import ContactRequest from "./ContactRequest";
import 'Root/styles/base.less';

export default () => (
    <div className="layout">
        <Switch>
            <Route exact path={ route.ConfirmPage } component={ Confirm } />
            <Route exact path={ route.loginPage } component={ Login } />
            <Route exact path={ route.loadingNetworkPage } component={ LoadingNetwork } />
            <Route exact path={ route.contactPage } component={ ContactRequest } />
            <Route path='/' component={ Login } />
        </Switch>
    </div>
);
