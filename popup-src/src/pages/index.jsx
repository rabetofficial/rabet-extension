import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';

import Home from './Home';
import Login from './Login';
import Error from './Error';
import Send from './Send';
import Flags from './Flags';
import QRCode from './QRCode';
import Assets from './Assets';
import Confirm from './Confirm';
import Setting from './Setting';
import AddAsset from './AddAsset';
import FirstPage from './FirstPage';
import FetchData from './FetchData';
import PrivateKey from './PrivateKey';
import LoadingOne from './LoadingOne';
import OfflineMode from './OfflineMode';
import LoadingNetwork from './LoadingNetwork';
import ConfirmLogin from './ConfirmLogin';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import * as route from '../staticRes/routes';
import ShowPrivateKey from './ShowPrivateKey';
import ContactRequest from './ContactRequest';
import LoadingOverlay from './LoadingOverlay';
import AccountManager from './AccountManager';
import SuccessfulSubmission from './SuccessfulSubmission';
import ConfirmFlag from './ConfirmFlag';
import XLMAsset from './XLMAsset';
import DeleteAccount from './DeleteAccount';
import ConnectedWebsite from './ConnectedWebsite';
import BackupFile from './BackupFile';

const App = () => (
  <Router>
    <div className="layout">
      <Switch>
        <ProtectedRoute exact path={route.homePage} component={Home} />
        <Route exact path={route.SendPage} component={Send} />
        <ProtectedRoute exact path={route.errorPage} component={Error} />
        <ProtectedRoute exact path={route.QRCodePage} component={QRCode} />
        <ProtectedRoute exact path={route.ConfirmPage} component={Confirm} />
        <ProtectedRoute exact path={route.settingPage} component={Setting} />
        <ProtectedRoute exact path={route.addAssetPage} component={AddAsset} />
        <ProtectedRoute exact path={route.privateKeyPage} component={PrivateKey} />
        <ProtectedRoute exact path={route.ShowPrivateKeyPage} component={ShowPrivateKey} />
        <ProtectedRoute exact path={route.accountManagerPage} component={AccountManager} />
        <ProtectedRoute exact path={`${route.assetsPage}/:asset_code/:asset_issuer`} component={Assets} />
        <ProtectedRoute exact path={route.xlmAssetPage} component={XLMAsset} />
        <ProtectedRoute exact path={route.successSubmitPage} component={SuccessfulSubmission} />
        <ProtectedRoute exact path={route.backupFile} component={BackupFile} />

        <Route exact path={route.flagPage} component={Flags} />
        <Route exact path={route.confirmFlagPage} component={ConfirmFlag} />
        <Route exact path={route.loginPage} component={Login} />
        <Route exact path={route.firstPage} component={FirstPage} />
        <Route exact path={route.fetchDataPage} component={FetchData} />
        <Route exact path={route.loadingOnePage} component={LoadingOne} />
        <Route exact path={route.loadingNetworkPage} component={LoadingNetwork} />
        <Route exact path={route.contactPage} component={ContactRequest} />
        <Route exact path={route.offlineModePage} component={OfflineMode} />
        <Route exact path={route.confirmLoginPage} component={ConfirmLogin} />
        <Route exact path={route.createWalletPage} component={CreateWallet} />
        <Route exact path={route.restoreWalletPage} component={RestoreWallet} />
        <Route exact path={route.loadingOverlayPage} component={LoadingOverlay} />
        <Route exact path={route.deleteAccountPage} component={DeleteAccount} />
        <Route exact path={route.connectedWebsitePage} component={ConnectedWebsite} />
      </Switch>
    </div>
  </Router>
);

export default App;
