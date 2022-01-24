import React from 'react';

import FontStyle from './fonts';
import GlobalStyle from './global';
import GeneralStyle from './general';

const Styles = ({ theme }) => (
  <div>
    <FontStyle theme={theme} />
    <GlobalStyle theme={theme} />
    <GeneralStyle theme={theme} />
  </div>
);

export default Styles;
