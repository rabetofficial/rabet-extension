import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import ProtectedRoute from '../components/ProtectedRoute';

import Home from './Home';
import Intro from './Intro';
import IntroSlides from './Slides';
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
import RouteName from '../staticRes/routes';
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
          path={RouteName.Home}
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.Send}
          element={
            <ProtectedRoute>
              <Send />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.Error}
          element={
            <ProtectedRoute>
              <Error />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.QRCode}
          element={
            <ProtectedRoute>
              <QRCode />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.Confirm}
          element={
            <ProtectedRoute>
              <Confirm />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.Setting}
          element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.AddAsset}
          element={
            <ProtectedRoute>
              <AddAsset />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.PrivateKey}
          element={
            <ProtectedRoute>
              <PrivateKey />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.ShowPrivateKey}
          element={
            <ProtectedRoute>
              <ShowPrivateKey />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.AccountManager}
          element={<AccountManager />}
        />
        <Route
          path={`${RouteName.Asset}/:asset_code/:asset_issuer`}
          element={
            <ProtectedRoute>
              <Assets />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.XLMAsset}
          element={
            <ProtectedRoute>
              <XLMAsset />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.Sucess}
          element={
            <ProtectedRoute>
              <SuccessfulSubmission />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.BackupFile}
          element={
            <ProtectedRoute>
              <BackupFile />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.BasicOperation}
          element={
            <ProtectedRoute>
              <BasicOperation />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.BasicSwapConfirm}
          element={
            <ProtectedRoute>
              <BasicSwapConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.BasicSendConfirm}
          element={
            <ProtectedRoute>
              <BasicSendConfirm />
            </ProtectedRoute>
          }
        />
        <Route
          path={RouteName.AdvancedOperation}
          element={
            <ProtectedRoute>
              <AdvanceOperation />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path={RouteName.Introduction}
          element={<Intro />}
        />
        <Route
          exact
          path={RouteName.IntroSlides}
          element={<IntroSlides />}
        />
        <Route exact path={RouteName.Flags} element={<Flags />} />
        <Route
          exact
          path={RouteName.ConfirmFlag}
          element={<ConfirmFlag />}
        />
        <Route exact path={RouteName.Login} element={<Login />} />
        <Route exact path={RouteName.First} element={<FirstPage />} />
        <Route
          exact
          path={RouteName.FetchData}
          element={<FetchData />}
        />
        <Route
          exact
          path={RouteName.LoadingOne}
          element={<LoadingOne />}
        />
        <Route
          exact
          path={RouteName.LoadingNetwork}
          element={<LoadingNetwork />}
        />
        <Route
          exact
          path={RouteName.ContactRequest}
          element={<ContactRequest />}
        />
        <Route
          exact
          path={RouteName.OfflineMode}
          element={<OfflineMode />}
        />
        <Route
          exact
          path={RouteName.Register}
          element={<ConfirmLogin />}
        />
        <Route
          exact
          path={RouteName.CreateWallet}
          element={<CreateWallet />}
        />
        <Route
          exact
          path={RouteName.RestoreWallet}
          element={<RestoreWallet />}
        />
        <Route
          exact
          path={RouteName.LoadingOverlay}
          element={<LoadingOverlay />}
        />
        <Route
          exact
          path={RouteName.DeleteAccount}
          element={<DeleteAccount />}
        />
        <Route
          exact
          path={RouteName.ConnectedWebsite}
          element={<ConnectedWebsite />}
        />
          <Route exact path="ui" element={ <ProtectedRoute><UITest /></ProtectedRoute>} />
      </Routes>
    </div>
  </Router>
);

export default App;
