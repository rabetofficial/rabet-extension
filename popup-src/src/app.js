import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Component from './pages';
import loadUser from './actions/user/loadUser';
import removeUserData from './actions/user/removeUserData';
import '../node_modules/purecss/build/pure-min.css';
import '../node_modules/react-popper-tooltip/dist/styles.css';
import './styles/style.less';

(async () => {
  // await removeUserData();
  await loadUser();

  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    global.document.getElementById('root'),
  );
})();
