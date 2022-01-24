import React from 'react';

import FontStyle from './fonts';
import BaseStyle from './base';
import OtherStyle from './styles';

const Styles = ({ theme }) => (
  <div>
    <FontStyle theme={theme} />
    <BaseStyle theme={theme} />
    <OtherStyle theme={theme} />
  </div>
);

export default Styles;
