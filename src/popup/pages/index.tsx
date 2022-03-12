import React from 'react';
import { Route, Routes } from 'react-router-dom';

import DetectSize from 'popup/components/DetectSize';
import ProtectedRoute from 'popup/components/ProtectedRoute';
import UnprotectedRoute from 'popup/components/UnprotectedRoute';

import RouteName from '../staticRes/routes';

import Intro from './Intro';
import Login from './Login';
import Flags from './Flags';
import EHome from './expand/EHome';
import Home from './extension/Home';
import FirstPage from './FirstPage';
import Error from './extension/Error';
import PrivateKey from './PrivateKey';
import LoadingOne from './LoadingOne';
import BackupFile from './BackupFile';
import IntroSlides from './IntroSlides';
import OfflineMode from './OfflineMode';
import ConfirmFlag from './ConfirmFlag';
import QRCode from './extension/Receive';
import Setting from './extension/Setting';
import ConfirmLogin from './ConfirmLogin';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import DeleteAccount from './DeleteAccount';
import AddAsset from './extension/AddAssets';
import AssetInfo from './extension/AssetInfo';
import LoadingNetwork from './extension/LoadingNetwork';
import ShowPrivateKey from './ShowPrivateKey';
import AccountManager from './AccountManager';
import AddContact from './extension/AddContact';
import EditContact from './extension/EditContact';
import ConnectedWebsite from './ConnectedWebsite';
import BasicOperation from './extension/Operation/Basic';
import LoggedCreateWallet from './extension/CreateWallet';
import LoggedImportWallet from './extension/ImportWallet';
import AdvanceOperation from './extension/Operation/Advance';
import SuccessfulSubmission from './extension/SuccessfulSubmission';
import BasicSendConfirm from './extension/Operation/Basic/ConfirmSend';
import BasicSwapConfirm from './extension/Operation/Basic/ConfirmSwap';

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
        path={RouteName.LoggedCreateWallet}
        element={
          <ProtectedRoute>
            <LoggedCreateWallet />
          </ProtectedRoute>
        }
      />

      <Route
        path={RouteName.LoggedImportWallet}
        element={
          <ProtectedRoute>
            <LoggedImportWallet />
          </ProtectedRoute>
        }
      />

      <Route
        path={RouteName.RestoreWallet}
        element={<RestoreWallet />}
      />

      <Route
        path={RouteName.DeleteAccount}
        element={<DeleteAccount />}
      />

      <Route
        path={RouteName.ConnectedWebsites}
        element={<ConnectedWebsite />}
      />
    </Routes>
  </div>
);

export default App;
