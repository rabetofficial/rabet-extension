import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import * as route from '../staticRes/routes';
import Home from './Home';
import Login from './Login';
import ConfirmLogin from './ConfirmLogin';
import FirstPage from './FirstPage';
import SuccessfulSubmission from './SuccessfulSubmission';
import Error from './Error';
import PrivateKey from './PrivateKey';
import QRCode from './QRCode';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import Send from './Send';
import Confirm from './Confirm';
import ShowPrivateKey from './ShowPrivateKey';
import Flags from './Flags';
import AddAsset from './AddAsset';
import Setting from './Setting';
import ContactRequest from './ContactRequest';
import FetchData from './FetchData';
import Assets from './Assets';
import LoadingOne from './LoadingOne';
import LoadingOverlay from './LoadingOverlay';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="layout">
          <Switch>
            <Route exact path={ route.homePage } component={ Home } />
            <Route exact path={ route.loginPage } component={ Login } />
            <Route exact path={ route.confirmLoginPage } component={ ConfirmLogin } />
            <Route exact path={ route.firstPage } component={ FirstPage } />
            <Route exact path={ route.successSubmitPage } component={ SuccessfulSubmission } />
            <Route exact path={ route.errorPage } component={ Error } />
            <Route exact path={ route.privateKeyPage } component={ PrivateKey } />
            <Route exact path={ route.QRCodePage } component={ QRCode } />
            <Route exact path={ route.createWalletPage } component={ CreateWallet } />
            <Route exact path={ route.restoreWalletPage } component={ RestoreWallet } />
            <Route exact path={ route.SendPage } component={ Send } />
            <Route exact path={ route.ConfirmPage } component={ Confirm } />
            <Route exact path={ route.ShowPrivateKeyPage } component={ ShowPrivateKey } />
            <Route exact path={ route.flagPage } component={ Flags } />
            <Route exact path={ route.addAssetPage } component={ AddAsset } />
            <Route exact path={ route.settingPage } component={ Setting } />
            <Route exact path={ route.contactPage } component={ ContactRequest } />
            <Route exact path={ route.fetchDataPage } component={ FetchData } />
            <Route exact path={ route.assetsPage } component={ Assets } />
            <Route exact path={ route.loadingOnePage } component={ LoadingOne } />
            <Route exact path={ route.loadingOverlayPage } component={ LoadingOverlay } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
