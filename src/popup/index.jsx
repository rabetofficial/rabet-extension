/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './store';
import Component from './pages';
import loadUser from './actions/user/loadUser';
import getHost from './actions/options/getHost';

import '../../node_modules/purecss/build/pure-min.css';
import '../../node_modules/react-popper-tooltip/dist/styles.css';
import './styles/main.css';
import theme from './styles/theme';
import Styles from './styles';

require('file-loader?name=[name].[ext]!./popup.html');

(async () => {
  await getHost();
  await loadUser();

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Styles theme={theme} />
        <Component />
      </ThemeProvider>
    </Provider>,
    global.document.getElementById('root'),
  );
})();
