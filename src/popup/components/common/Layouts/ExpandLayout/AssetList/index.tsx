import React from 'react';

import Asset from './Asset';

import {Border} from './styles';

const AssetList = () => (
  <div>
    {Array(4)
      .fill(0)
      .map((item, index) => (
        <Border key={index}>
          <Asset />
        </Border>
      ))}
  </div>
);

export default AssetList;
