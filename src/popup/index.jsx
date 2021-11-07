/* eslint-disable no-use-before-define */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react';
import { render } from 'react-dom';

import App from './App';

import './styles.less';

require('file-loader?name=[name].[ext]!./popup.html');

render(
  <App />,
  document.getElementById('root'),
);
