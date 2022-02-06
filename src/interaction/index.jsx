/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import App from './views';
import listenMessage from './actions/listenMessage';

(async () => {
  listenMessage().then(() => {
    render(<App />, global.document.getElementById('root'));
  });
})();
