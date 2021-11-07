import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

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
      <Routes>
        <ProtectedRoute exact path={route.homePage} element={<Home />} />
        <Route exact path={route.SendPage} element={<Send />} />
        <ProtectedRoute exact path={route.errorPage} element={<Error />} />
        <ProtectedRoute exact path={route.QRCodePage} element={<QRCode />} />
        <ProtectedRoute exact path={route.ConfirmPage} element={<Confirm />} />
        <ProtectedRoute exact path={route.settingPage} element={<Setting />} />
        <ProtectedRoute exact path={route.addAssetPage} element={<AddAsset />} />
        <ProtectedRoute exact path={route.privateKeyPage} element={<PrivateKey />} />
        <ProtectedRoute exact path={route.ShowPrivateKeyPage} element={<ShowPrivateKey />} />
        <ProtectedRoute exact path={route.accountManagerPage} element={<AccountManager />} />
        <ProtectedRoute exact path={`${route.assetsPage}/:asset_code/:asset_issuer`} element={<Assets />} />
        <ProtectedRoute exact path={route.xlmAssetPage} element={<XLMAsset />} />
        <ProtectedRoute exact path={route.successSubmitPage} element={<SuccessfulSubmission />} />
        <ProtectedRoute exact path={route.backupFile} element={<BackupFile />} />

        <Route exact path={route.flagPage} element={<Flags />} />
        <Route exact path={route.confirmFlagPage} element={<ConfirmFlag />} />
        <Route exact path={route.loginPage} element={<Login />} />
        <Route exact path={route.firstPage} element={<FirstPage />} />
        <Route exact path={route.fetchDataPage} element={<FetchData />} />
        <Route exact path={route.loadingOnePage} element={<LoadingOne />} />
        <Route exact path={route.loadingNetworkPage} element={<LoadingNetwork />} />
        <Route exact path={route.contactPage} element={<ContactRequest />} />
        <Route exact path={route.offlineModePage} element={<OfflineMode />} />
        <Route exact path={route.confirmLoginPage} element={<ConfirmLogin />} />
        <Route exact path={route.createWalletPage} element={<CreateWallet />} />
        <Route exact path={route.restoreWalletPage} element={<RestoreWallet />} />
        <Route exact path={route.loadingOverlayPage} element={<LoadingOverlay />} />
        <Route exact path={route.deleteAccountPage} element={<DeleteAccount />} />
        <Route exact path={route.connectedWebsitePage} element={<ConnectedWebsite />} />
      </Routes>
    </div>
  </Router>
);

export default App;
