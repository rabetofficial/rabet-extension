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

import 'react-slideshow-image/dist/styles.css';
import 'purecss/build/pure-min.css';
import 'react-popper-tooltip/dist/styles.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/shift-away.css';
import './styles/main.css';
import './styles/font.css';
import theme from './styles/theme';
import Global from './styles/global';

require('file-loader?name=[name].[ext]!./popup.html');

(async () => {
  await getHost();
  await loadUser();

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global theme={theme} />
        <Component />
      </ThemeProvider>
    </Provider>,
    global.document.getElementById('root'),
  );
})();
