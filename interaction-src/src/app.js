import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './views';
import listenMessage from './actions/listenMessage'

(async() => {
  listenMessage()
  .then((result) => {
    render(
      <App />,
      global.document.getElementById('root'),
    );
  });
})()


if (module.hot) {
  module.hot.accept();

  module.hot.addStatusHandler((status) => {
    if (status === 'prepare') {
      console.clear();
    }
  });
}
