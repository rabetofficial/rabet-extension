import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DetectSize from 'popup/components/DetectSize';
import ProtectedRoute from 'popup/components/ProtectedRoute';
import UnprotectedRoute from 'popup/components/UnprotectedRoute';

import Home from './extension/Home';
import EHome from './expand/EHome';
import Intro from './Intro';
import IntroSlides from './IntroSlides';
import Login from './Login';
import Error from './extension/Error';
import Send from './Send';
import Flags from './Flags';
import QRCode from './extension/Receive';
import AssetInfo from './extension/AssetInfo';
import Confirm from './Confirm';
import Setting from './extension/Setting';
import AddAsset from './extension/AddAssets';
import FirstPage from './FirstPage';
import PrivateKey from './PrivateKey';
import LoadingOne from './LoadingOne';
import OfflineMode from './OfflineMode';
import LoadingNetwork from './LoadingNetwork';
import ConfirmLogin from './ConfirmLogin';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import RouteName from '../staticRes/routes';
import ShowPrivateKey from './ShowPrivateKey';
import LoadingOverlay from './LoadingOverlay';
import AccountManager from './AccountManager';
import SuccessfulSubmission from './extension/SuccessfulSubmission';
import ConfirmFlag from './ConfirmFlag';
import DeleteAccount from './DeleteAccount';
import ConnectedWebsite from './ConnectedWebsite';
import BackupFile from './BackupFile';
import BasicOperation from './extension/Operation/Basic';
import BasicSwapConfirm from './extension/Operation/Basic/ConfirmSwap';
import BasicSendConfirm from './extension/Operation/Basic/ConfirmSend';
import AdvanceOperation from './Operation/Adavnce';
import UITest from './UITest';
import EditContact from './extension/EditContact';
import AddContact from './extension/AddContact';

const App = () => (
  <div className="layout">
    <Routes>
      <Route
        path={RouteName.Home}
        element={
          <ProtectedRoute>
            <DetectSize desktop={<EHome />}>
              <Home />
            </DetectSize>
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
            <DetectSize desktop={<div>Not found</div>}>
              <QRCode />
            </DetectSize>
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
        path={RouteName.AddContact}
        element={
          <ProtectedRoute>
            <AddContact />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteName.EditContact}
        element={
          <ProtectedRoute>
            <EditContact />
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
        path={`${RouteName.AssetInfo}/:asset_code/:asset_issuer/:asset_type`}
        element={
          <ProtectedRoute>
            <AssetInfo />
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
        path={RouteName.Introduction}
        element={
          <UnprotectedRoute>
            <Intro />
          </UnprotectedRoute>
        }
      />
      <Route
        path={RouteName.IntroSlides}
        element={
          <UnprotectedRoute>
            <IntroSlides />
          </UnprotectedRoute>
        }
      />
      <Route path={RouteName.Flags} element={<Flags />} />
      <Route
        path={RouteName.ConfirmFlag}
        element={
          <ProtectedRoute>
            <ConfirmFlag />
          </ProtectedRoute>
        }
      />
      <Route path={RouteName.Login} element={<Login />} />
      <Route path={RouteName.First} element={<FirstPage />} />
      <Route path={RouteName.LoadingOne} element={<LoadingOne />} />
      <Route
        path={RouteName.LoadingNetwork}
        element={<LoadingNetwork />}
      />
      <Route path={RouteName.OfflineMode} element={<OfflineMode />} />
      <Route
        path={RouteName.Register}
        element={
          <UnprotectedRoute>
            <ConfirmLogin />
          </UnprotectedRoute>
        }
      />
      <Route
        path={RouteName.CreateWallet}
        element={<CreateWallet />}
      />
      <Route
        path={RouteName.RestoreWallet}
        element={<RestoreWallet />}
      />
      <Route
        path={RouteName.LoadingOverlay}
        element={<LoadingOverlay />}
      />
      <Route
        path={RouteName.DeleteAccount}
        element={<DeleteAccount />}
      />
      <Route
        path={RouteName.ConnectedWebsites}
        element={<ConnectedWebsite />}
      />
      <Route
        path="ui"
        element={
          <ProtectedRoute>
            <UITest />
          </ProtectedRoute>
        }
      />
    </Routes>
  </div>
);

export default App;
