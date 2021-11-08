import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import history from './history';
import App from './App';

export default () => (
  <Router>
    <App />
  </Router>
);
