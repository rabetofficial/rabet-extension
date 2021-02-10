import React from 'react';
import { Router } from 'react-router-dom';
import history from 'Root/history';
import App from './App';

export default () => (
    <Router history={history}>
      <App />
    </Router>
);
