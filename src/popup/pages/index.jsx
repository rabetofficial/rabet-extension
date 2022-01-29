import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';

import Home from './Home';
import Intro from './Intro';
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
import BasicOperation from './Operation/Basic';
import BasicSwapConfirm from './Operation/Basic/Swap/Confirm';
import BasicSendConfirm from './Operation/Basic/Send/Confirm';
import AdvanceOperation from './Operation/Adavnce';
import UITest from './UITest';

const App = () => (
  <Router>
    <div className="layout">
      <Routes>
        <Route
          path={route.homePage}
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path={route.SendPage}
          element={<ProtectedRoute><Send /></ProtectedRoute>}
        />
        <Route
          path={route.errorPage}
          element={<ProtectedRoute><Error /></ProtectedRoute>}
        />
        <Route
          path={route.QRCodePage}
          element={<ProtectedRoute><QRCode /></ProtectedRoute>}
        />
        <Route
          path={route.ConfirmPage}
          element={<ProtectedRoute><Confirm /></ProtectedRoute>}
        />
        <Route
          path={route.settingPage}
          element={<ProtectedRoute><Setting /></ProtectedRoute>}
        />
        <Route
          path={route.addAssetPage}
          element={<ProtectedRoute><AddAsset /></ProtectedRoute>}
        />
        <Route
          path={route.privateKeyPage}
          element={<ProtectedRoute><PrivateKey /></ProtectedRoute>}
        />
        <Route
          path={route.ShowPrivateKeyPage}
          element={<ProtectedRoute><ShowPrivateKey /></ProtectedRoute>}
        />
        <Route
          path={route.accountManagerPage}
          element={<AccountManager />}
        />
        <Route
          path={`${route.assetsPage}/:asset_code/:asset_issuer`}
          element={<ProtectedRoute><Assets /></ProtectedRoute>}
        />
        <Route
          path={route.xlmAssetPage}
          element={<ProtectedRoute><XLMAsset /></ProtectedRoute>}
        />
        <Route
          path={route.successSubmitPage}
          element={<ProtectedRoute><SuccessfulSubmission /></ProtectedRoute>}
        />
        <Route
          path={route.backupFile}
          element={<ProtectedRoute><BackupFile /></ProtectedRoute>}
        />
        <Route
          path={route.basicOperationPage}
          element={<ProtectedRoute><BasicOperation /></ProtectedRoute>}
        />
        <Route
          path={route.basicSwapConfirmPage}
          element={<ProtectedRoute><BasicSwapConfirm /></ProtectedRoute>}
        />
        <Route
          path={route.basicSendConfirmPage}
          element={<ProtectedRoute><BasicSendConfirm /></ProtectedRoute>}
        />
        <Route
          path={route.advanceOperationPage}
          element={<ProtectedRoute><AdvanceOperation /></ProtectedRoute>}
        />

        <Route exact path={route.introduction} element={<Intro />} />
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
        <Route exact path="ui" element={<UITest />} />
      </Routes>
    </div>
  </Router>
);

export default App;
