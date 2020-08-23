import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import loadUser from 'Root/actions/user/loadUser';
import ProtectedRoute from 'Root/components/ProtectedRoute';

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
import ConfirmLogin from './ConfirmLogin';
import CreateWallet from './CreateWallet';
import RestoreWallet from './RestoreWallet';
import * as route from '../staticRes/routes';
import ShowPrivateKey from './ShowPrivateKey';
import ContactRequest from './ContactRequest';
import LoadingOverlay from './LoadingOverlay';
import SuccessfulSubmission from './SuccessfulSubmission';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     loading: true,
  //   }
  // }
  //
  // componendDidMount() {
  //   loadUser().then(() => {
  //     this.setState({
  //       loading: false,
  //     });
  //   });
  // }

  render() {
    return (
      <Router>
        <div className="layout">
          <Switch>
            <ProtectedRoute exact path={ route.homePage } component={ Home } />
            <ProtectedRoute exact path={ route.SendPage } component={ Send } />
            <ProtectedRoute exact path={ route.errorPage } component={ Error } />
            <ProtectedRoute exact path={ route.QRCodePage } component={ QRCode } />
            <ProtectedRoute exact path={ route.assetsPage } component={ Assets } />
            <ProtectedRoute exact path={ route.ConfirmPage } component={ Confirm } />
            <ProtectedRoute exact path={ route.settingPage } component={ Setting } />
            <ProtectedRoute exact path={ route.addAssetPage } component={ AddAsset } />
            <ProtectedRoute exact path={ route.privateKeyPage } component={ PrivateKey } />
            <ProtectedRoute exact path={ route.ShowPrivateKeyPage } component={ ShowPrivateKey } />
            <ProtectedRoute exact path={ route.successSubmitPage } component={ SuccessfulSubmission } />

            <Route exact path={ route.flagPage } component={ Flags } />
            <Route exact path={ route.loginPage } component={ Login } />
            <Route exact path={ route.firstPage } component={ FirstPage } />
            <Route exact path={ route.fetchDataPage } component={ FetchData } />
            <Route exact path={ route.loadingOnePage } component={ LoadingOne } />
            <Route exact path={ route.contactPage } component={ ContactRequest } />
            <Route exact path={ route.confirmLoginPage } component={ ConfirmLogin } />
            <Route exact path={ route.createWalletPage } component={ CreateWallet } />
            <Route exact path={ route.restoreWalletPage } component={ RestoreWallet } />
            <Route exact path={ route.loadingOverlayPage } component={ LoadingOverlay } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
